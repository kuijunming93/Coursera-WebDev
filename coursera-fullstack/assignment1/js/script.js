let reserveBtn = document.getElementById('reserveTableBtn');
reserveBtn.addEventListener('click', () =>{
    $("#reserveModal").modal('toggle');
});

//this JS script replaces this -> data-toggle="modal" data-target="#reserveModal"