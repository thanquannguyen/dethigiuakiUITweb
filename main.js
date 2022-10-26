display();

function xoa() {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    let exist = data.length && JSON.parse(localStorage.getItem('data'))
    if (exist) {
        localStorage.removeItem('data');
    }
    alert("Đã reset thành công.")
}

function store() {
    let tensanpham = document.getElementById("tensanpham").value;
    let gia = document.getElementById('gia').value;
    let nguoiban = document.getElementById('nguoiban').value;
    let dcsdt = document.getElementById('dcsdt').value;
    let tinhtrang = document.getElementById('tinhtrang').value;
    let mota = document.getElementById('mota').value;
    let hinhanh = document.getElementById('hinhanh').value;

    if (tensanpham == "" || gia == "" || nguoiban == "" || dcsdt == "" || tinhtrang == "" || mota == "" || hinhanh == "") {
        return false;
    } else {
        let data = JSON.parse(localStorage.getItem('data')) || [];
        let exist = data.length && JSON.parse(localStorage.getItem('data')).some(data => data.tensanpham.toLowerCase() == tensanpham.toLowerCase());
        if (!exist) {
            data.push({
                tensanpham,
                gia,
                nguoiban,
                dcsdt,
                tinhtrang,
                mota,
                hinhanh
            });
            localStorage.setItem('data', JSON.stringify(data));
            alert("Thêm sản phẩm thành công.");
            // location.reload();
            console.log(data);
            document.querySelector('form').reset();
        } else {
            alert("Sản phẩm này đã có.");
            return false;
        }
    }
    display();
}


function display() {
    let exist = localStorage.getItem('data');
    if (exist) {
        let output = document.getElementById("result");
        output.innerHTML = "";
        JSON.parse(exist).forEach(data => {
            output.innerHTML += `
            <div class="display">
            <img src="${data.hinhanh}"
                style="width:160px;height:250px;">
            <br>
            <a class="detailpage tensanpham" href="javascript:chitiet();">${data.tensanpham}</a>
            <br>
            <label>Giá: ${data.gia}</label>
            <br>
            <label>Tình trạng: ${data.tinhtrang}</label>
            <br>
            <label>Người bán: ${data.nguoiban}</label>
            <br>
            <label>Liên hệ: ${data.dcsdt}</label>
        </div>
            `
        })
    }
}

function chitiet() {
    let exist = localStorage.getItem('data');
    if (exist) {
        $(document).ready(function () {
            $('.detailpage').click(function (e) {
                e.preventDefault();
                info = ($(this).parents('.display').find(".tensanpham:eq(0)").text());

                let data = JSON.parse(localStorage.getItem('data')) || [];
                for (var i = 0; i < data.length; i++) {
                    let check = data[i].tensanpham;

                    if (info == check) {
                        var tab = window.open('about:blank', '_blank');
                        var tensanpham = data[i].tensanpham;
                        var gia = data[i].gia;
                        var nguoiban = data[i].nguoiban;
                        var dcsdt = data[i].dcsdt;
                        var tinhtrang = data[i].tinhtrang;
                        var mota = data[i].mota;
                        var hinhanh = data[i].hinhanh;
                        console.log(data[i].nguoiban)
                        tab.document.write(`
                        <div style="width: 50%; margin: 20px">
                        <fieldset style="padding-left: 10px">
                            <div style="display: flex">
                                <div style="margin: 1px 10px">
                                    <img src=" ` + hinhanh + ` "
                                        style="width:160px;height:250px;">
                                </div>
                                <div>
                                    <h2> ` + tensanpham + ` </h2>
                                    <label>Giá: </label><label style="font-size: x-large;"> ` + gia + ` </label><br>
                                    <label>Tình trạng: </label><label style="font-size: x-large;"> ` + tinhtrang + ` </label><br>
                                    <label>Người bán: </label><label style="font-size: x-large;"> ` + nguoiban + ` </label><br>
                                    <label>Liên hệ: </label><label style="font-size: x-large;"> ` + dcsdt + `</label><br>
                                </div>
                            </div>
                            <label>Chitiet</label>
                            <p> ` + mota + `</p>
                        </fieldset>
                        </div>
                        `)
                        tab.document.close();
                    }
                }
                data = JSON.stringify(data);
            });
        });
    }
}