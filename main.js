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
    let tensach = document.getElementById("tensach").value;
    let tacgia = document.getElementById('tacgia').value;
    let gia = document.getElementById('gia').value;
    let namxuatban = document.getElementById('namxuatban').value;
    let nhaxuatban = document.getElementById('nhaxuatban').value;
    let gioithieusach = document.getElementById('gioithieusach').value;
    let hinhanh = document.getElementById('hinhanh').value;

    if (tensach == "" || tacgia == "" || gia == "" || namxuatban == "" || nhaxuatban == "" || gioithieusach == "" || hinhanh == "") {
        return false;
    } else {
        let data = JSON.parse(localStorage.getItem('data')) || [];
        let exist = data.length && JSON.parse(localStorage.getItem('data')).some(data => data.tensach.toLowerCase() == tensach.toLowerCase());
        if (!exist) {
            data.push({
                tensach,
                tacgia,
                gia,
                namxuatban,
                nhaxuatban,
                gioithieusach,
                hinhanh
            });
            localStorage.setItem('data', JSON.stringify(data));
            alert("Thêm sách thành công.");
            // location.reload();
            console.log(data);
            document.querySelector('form').reset();
        } else {
            alert("Sách này đã có.");
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
            <label class="tensach">${data.tensach}</label>
            <br>
            <label>Tác giả: ${data.tacgia}</label>
            <br>
            <label>Năm xuất bản: ${data.namxuatban}</label>
            <br>
            <h3>Giá: ${data.gia}</h3>
            <br>
            <a class="detailpage" href="javascript:chitiet();">Chi tiết</a>
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
                info = ($(this).parents('.display').find(".tensach:eq(0)").text());

                let data = JSON.parse(localStorage.getItem('data')) || [];
                for (var i = 0; i < data.length; i++) {
                    let check = data[i].tensach;

                    if (info == check) {
                        var tab = window.open('about:blank', '_blank');
                        var tennsach = data[i].tensach;
                        var tacgia = data[i].tacgia;
                        var gia = data[i].gia;
                        var namxuatban = data[i].namxuatban;
                        var nhaxuatban = data[i].nhaxuatban;
                        var gioithieusach = data[i].gioithieusach;
                        var hinhanh = data[i].hinhanh;
                        console.log(data[i].gia)
                        tab.document.write(`
                        <div style="width: 50%; margin: 20px">
                        <fieldset style="padding-left: 10px">
                            <div style="display: flex">
                                <div style="margin: 1px 10px">
                                    <img src=" ` + hinhanh + ` "
                                        style="width:160px;height:250px;">
                                </div>
                                <div>
                                    <h2> ` + tennsach + ` </h2>
                                    <label>Tác giả: </label><label style="font-size: x-large;"> ` + tacgia + ` </label><br>
                                    <label>Nhà xuất bản: </label><label style="font-size: x-large;"> ` + nhaxuatban + ` </label><br>
                                    <label>Năm xuất bản: </label><label style="font-size: x-large;"> ` + namxuatban + ` </label><br>
                                    <label>Giá: </label><label style="font-size: x-large;"> ` + gia + `</label><br>
                                </div>
                            </div>
                            <label>Giới thiệu sách</label>
                            <p> ` + gioithieusach + `</p>
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