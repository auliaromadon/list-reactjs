import React from "react"
import Poster from "../components/poster"
import $ from "jquery"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class LingkunganHidup extends React.Component{
    constructor(){
        super()
        this.state ={
            poster: [ //poster adalah array yang memiliki tida objek
                {
                    nomor: "1", judul: "Hari Hutan", tanggal: "21 Maret",
                    cover: "image/harihutan.jpg"
                },

                {
                    nomor: "2", judul: "Hari Air Sedunia", tanggal: "22 Maret",
                    cover: "image/hariair.png"
                },

                {
                    nomor: "3", judul: "Hari Bumi", tanggal: "22 April",
                    cover: "image/haribumi.jpg"
                },

            ],

            action: "",
            nomor: "",
            judul: "",
            tanggal: "",
            cover: "",
            selectedItem: null,
            keyword: "",
            filterPoster: []
        }

        this.state.filterPoster = this.state.poster
    }

    Add = () => {
        // menampilkan komponen modalnya //fungsi $ untuk menunjuk elemen apa yang ingin diberikan aksi
        $("#modal_poster").modal("show")
        this.setState({
            nomor: Math.random(1,10000000), //generate
            judul: "",
            tanggal: "",
            cover: "",
            action: "insert"

        })
    }
    //item adalah elemen atau data yang dipiih user, data mana yang akan dirubah 
    Edit = (item) => {
        //menampilkan komponen modal
        $("#modal_poster").modal("show")
        this.setState({
            nomor: item.nomor,
            judul: item.judul,
            tanggal: "",
            cover: item.cover,
            action: "update",
            selectedItem: item

        })
    }

    Save = (event) => {
        event.preventDefault();
        //menampung data state poster
        let tempPoster = this.state.poster

        if(this.state.action === "insert" ) {
            //menambah data baru
            tempPoster.push({
                nomor: this.state.nomor,
                judul: this.state.judul,
                cover: this.state.cover,
                tanggal: this.state.tanggal
            })
        } else if(this.state.action === "update" ) {
            //menyimpan perubahan data
            let index = tempPoster.indexOf(this.state.selectedItem)
            tempPoster[index].nomor= this.state.nomor
            tempPoster[index].judul= this.state.judul
            tempPoster[index].cover= this.state.cover
            tempPoster[index].tanggal= this.state.tanggal
        }

        this.setState({poster : tempPoster})

        //menutup komponen modal_poster
        $("#modal_poster").modal("hide")
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            // menghapus data
            let tempPoster = this.state.poster
            // posisi index data yg akan dihapus
            let index = tempPoster.indexOf(item)

            // hapus data
            tempPoster.splice(index, 1)

            this.setState({poster: tempPoster})
        }
  }

    searching = event => {
        if(event.keyCode === 13){
            //13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempPoster = this.state.poster
            let result = tempPoster.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                item.tanggal.toLowerCase().includes(keyword)
            })

            this.setState({filterPoster: result})
        }
    }

    render(){
        return(
            <div className="container">
                <input type="text" className="from-control my-2" placeholder="Pencarian"
                value={this.state.keyword}
                onChange={ev => this.setState({keyword: ev.target.value})}
                onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    {/* { this.state.poter.map((item, index) => ( */}
                    { this.state.filterPoster.map((item, index) => (
                        <Poster
                        judul={item.judul}
                        tanggal={item.tanggal}
                        cover={item.cover}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    )) }
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_poster">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form
                            </div>

                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Hari Besar
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.judul}
                                    onChange={ ev => this.setState({judul: ev.target.value}) }
                                    required />

                                    Tanggal
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.tanggal}
                                    onChange={ ev => this.setState({tanggal: ev.target.value}) }
                                    required />
                                    
                                    Cover
                                    <input type="url" className="form-control mb-2"
                                    value={this.state.cover}
                                    onChange={ ev => this.setState({cover: ev.target.value}) }
                                    required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default LingkunganHidup;