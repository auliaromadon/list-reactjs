import React, {Component} from "react";  
import $ from "jquery";

class Keranjang extends Component {  
    constructor(){  
        super();  
        this.state = {  
            keranjang : [  
            {
                no: 1, nama: "Bumi", harga: 70000, jumlah: 1,
                totalhargaawal: 70000
            }, 

            {
                no: 2,
                nama: "Bulan", harga: 90000, jumlah: 1,
                totalhargaawal: 90000
            },  

            {
                no: 3,
                nama: "Anak Badai", harga: 80000, jumlah: 1,
                totalhargaawal: 80000
            },  
            ],  

            no: 0,  
            nama: "",  
            harga: 0,
            jumlah: 0,
            totalharga: "",
            action: "" 
        }
    }  

    bind = (event) => {  
        this.setState({[event.target.name]: event.target.value});  
    }

    cekTotalHarga = () => {
        let temp = this.state.keranjang;
        let hitung = 0;
        for(let i = 0; i < temp.length; i++){
            hitung += temp[i].totalhargaawal;
        } 
        this.setState({
            totalharga: "Total Harga Semua Barang : Rp "+hitung
        });  

    }
    
    increment = (index) => {
        let temp = this.state.keranjang;
        let hitung = 0;
        let c = temp[index].jumlah;
        temp[index].jumlah = ++c; 
        temp[index].totalhargaawal = temp[index].jumlah*temp[index].harga;
        for(let i = 0; i < temp.length; i++){
            hitung += temp[i].totalhargaawal;
        } 
        this.setState({
            keranjang: temp,
            totalharga: "Total Harga Semua Barang : Rp "+hitung
        });   
    }

    decrement = (index) => {
        let temp = this.state.keranjang;
        let hitung = 0;
        let c = temp[index].jumlah;
        temp[index].jumlah = --c;  
        temp[index].totalhargaawal = temp[index].jumlah*temp[index].harga;
        for(let i = 0; i < temp.length; i++){
            hitung += temp[i].totalhargaawal;
        }
        this.setState({
            keranjang: temp,
            totalharga: "Total Harga Semua Barang : Rp "+hitung
        });  
    }

    Add = () => {   
        let angka = this.state.keranjang;
        let angkaupdate = angka.length;
        this.setState({  
            no: ++angkaupdate,  
            nama: "",  
            harga: 0,
            jumlah: 0,
            totalhargaawal: 0, 
            action: "insert"  
        });  
    }  

    Edit = (item) => {  
        this.setState({  
            no: item.no,  
            nama: item.nama,  
            harga: item.harga,  
            jumlah: item.jumlah, 
            action: "update"  
        });  
    }  

    Drop = (index) => {  
        let temp = this.state.keranjang;  
        temp.splice(index,1);  
        
        this.setState({keranjang: temp});  
    }  

    SaveKeranjang = (event) =>{  
        event.preventDefault();  
 
        let temp = this.state.keranjang;  
        
        if (this.state.action === "insert") {  
  
            temp.push({  
                no: this.state.no,  
                nama: this.state.nama,  
                harga: this.state.harga,
                jumlah: this.state.jumlah,
                totalhargaawal: this.state.harga*this.state.jumlah,  
            });  
        } else if (this.state.action === "update") {  
            let index = temp.findIndex(item => item.no === this.state.no);  
            temp[index].nama = this.state.nama;  
            temp[index].harga = this.state.harga;  
            temp[index].jumlah = this.state.jumlah;  
            temp[index].totalhargaawal = this.state.harga*this.state.jumlah;  
        }  
        
        this.setState({keranjang: temp});  
        
        $("#modal").modal('hide');  
    }  

    render(){  
        return (  
            <header class="header">
                <div class="title">
                <hr />
                <h1><center>KERANJANG</center></ h1>
                </div>

            <div className="container">  
            <hr />

            { /* generate list */ } 
                <ul className="list-group">  
                {this.state.keranjang.map((item,index) => {  
                    return (
                        <li className="list-group-item" key={index} >  
                            <h5 className="text-dark">{item.nama}</h5>  
                            <h6>Harga : Rp {item.harga} per {item.nama}</h6>  
                            <div className="row col-4">
                                <div className="col-sm-2">
                                    <button className="btn btn-sm btn-danger btn-block" onClick={() => this.decrement(index)}> - </button>
                                </div>
                                <div className="col-15">
                                    <input type="number" className="form-control btn-sm text-center" value={item.jumlah} readOnly></input>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-sm btn-success btn-block" onClick={() => this.increment(index)}> +  </button>
                                </div>
                            </div>

                            <hr></hr>
                            <h6>Total Harga : Rp {item.totalhargaawal}</h6>
                            <hr></hr>
                            <button className="btn btn-sm btn-primary m-1" onClick={() => this.Edit(item)} data-toggle="modal" data-target="#modal">  
                                Edit
                            </button>  
                            <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(index)}>  
                                Hapus
                            </button>  
                        </li>  
                    );  
                })}  
                </ul>
                <div className="bg-light col-lg-12 text-back"><hr></hr>
                    <button className="btn btn-sm btn-success col-3 btn-block" onClick={this.cekTotalHarga}>Cek Total Harga Semua Barang</button>
                    {this.state.totalharga}
                    <hr></hr>
                </div>
                <button className="btn btn-success" onClick={this.Add} data-toggle="modal" data-target="#modal">  
                    Tambah Data  
                </button><br></br><br></br>

                { /* elemen form modal */ }  
                <div className="modal fade" id="modal">  
                    <div className="modal-dialog">  
                        <div className="modal-content">  
                            <div className="modal-header bg-info text-white">  
                                <h5 >Form keranjang</h5>  
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  
                            <form onSubmit={this.SaveKeranjang}>  
                                <div className="modal-body">  
                                    Nama Barang
                                    <input type="text" name="nama" className="form-control" onChange={this.bind}  
                                    value={this.state.nama} />  
                                    Jumlah  
                                    <input type="number" name="jumlah" className="form-control" onChange={this.bind}  
                                    value={this.state.jumlah} />  
                                    Harga  
                                    <input type="number" name="harga" className="form-control" onChange={this.bind}  
                                    value={this.state.harga} />  
                                </div>  
                                <div className="modal-footer">  
                                    <button type="submit" className="btn btn-primary">  
                                    Simpan  
                                    </button>  
                                </div>  
                            </form>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </header>
        );  
    }  
}  
export default Keranjang;  