const time = new Date().getHours();
const taskTbl = document.getElementById('taskTable');
const task = document.getElementById("task");
const prio = document.getElementById("priority");
const date = document.getElementById("date");
const des = document.getElementById('description');
var btnUpdate = document.getElementById('btnUpdate');
var btnAdd = document.getElementById('btnAdd');
var btnClear = document.getElementById('btnClear');
var btnYes = document.getElementById("btnYes");
var btnNo = document.getElementById("btnNo");
var alertBox = document.querySelector(".alertDel");
var body = document.querySelector('.full-container');
var i2;
const itemList = getData();
btnAdd.style.display = 'block';
btnUpdate.style.display = 'none';
btnClear.style.display = 'none';
var icon = document.querySelector('.fa-solid');
var Trequired = document.querySelector(".Trequired");
var Drequired = document.querySelector(".Drequired");
var DarkMode = document.querySelector(".slider");
var mySearch = document.getElementById("mySearch");
var trs = document.getElementsByTagName('tr');

// ---- Greeting Message----
let greeting;
if (time >= 1 && time <12) {
  greeting = "Good Morning!";
  icon.classList.add('fa-sun');
}else if (time >= 12 && time < 18) {
  greeting = "Good Afternoon!";
  icon.classList.add('fa-cloud-sun');
}else if (time >= 18 && time < 20){
  greeting = "Good Evening!";
  icon.classList.add('fa-cloud-moon');
}
else{
  greeting = "Good Night!";
  icon.classList.add('fa-moon');
};
document.getElementById('greeting').innerHTML = greeting;

// Show Data when page is loaded
document.onload = get_Item();
function getData(){
  return localStorage.getItem("itemList") ?
   JSON.parse(localStorage.getItem("itemList")) : [];
}
function saveData(){
  localStorage.setItem("itemList", JSON.stringify(itemList));
}

  function get_Item(){
    var txt = `
                  <tr class="sticky-header">
                    <th>No</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
              `;
      for (i in itemList){
        txt += `
                  <tr>
                    <td data="No :">${Number(i)+1}</td>
                    <td data="Title :">${itemList[i]['task']}</td>
                    <td data="Priority :">${itemList[i]['priority']}</td>
                    <td data="Deadline :">${itemList[i]['date']}</td>
                    <td data="Description :">${itemList[i]['description']}</td>
                    <td data="Action :" class="actionBtn">
                        <i class="fa-solid fa-trash-can btnDel"></i>  |    
                        <i class="fa-solid fa-pen-to-square btnEdit"></i>
                    </td>
                  </tr>
                `;
      };
      taskTbl.innerHTML = txt ;
  

       // ------change row color when mouseover-----
       for (let i = 1; i < trs.length; i++) {
        trs[i].addEventListener('mouseover', function() {
          this.style.cssText = 
          "background: var(--input-color); transition: .2s; ; border-bottom: 2px solid #009879; border-left: 5px solid #009879";
        });
        
        trs[i].addEventListener('mouseout', function() {
          this.style.cssText = "background: var(--primary-color)";
        });
      }


      // --------Edit Data----------
      var btnEdit = document.querySelectorAll('.btnEdit');
      btnEdit.forEach((e , i) => {
        e.addEventListener("click",function(){
            task.value = itemList[i]['task']
            prio.value = itemList[i]['priority']
            date.value = itemList[i]['date']
            des.value = itemList[i]['description']
            btnAdd.style.display = 'none';
            btnUpdate.style.display = 'block';
            i2 = i;
            task.focus();
            task.select();
            HideRequiredTxt();
        });
      });

      // --------Delete Data---------
      var btnDel = document.querySelectorAll(".btnDel");
      btnDel.forEach((e , i)=>{
        e.addEventListener("click",function(){
          alertBox.style.display = "block"; 
          body.style.opacity = "0.5";
          btnYes.addEventListener("click",function(){
            itemList.splice(i , 1);
            saveData();
            get_Item();
            body.style.opacity = "1";
          });
        });
      });
      btnNo.addEventListener("click",function(){
        body.style.opacity = "1";
      })

      PriorityColorStatus();
    
};
  get_Item();

  function formValue(){
     let formValue =  {
        "task":task.value, "priority":prio.value, "date":date.value, "description":des.value
      };
      return formValue;
  }
  
  // ---- Get Item Data from input-------
  btnAdd.addEventListener("click",function(){
    if(task.value == ''){
      ShowRequiredTxt();
      return(task);
    }else if(date.value == ''){
      date.style.border = "1px solid red";
      Drequired.style.display = "block";
      return(date);
    }else if(des.value == ''){
      itemList.push(formValue());
    }
    else{
        itemList.push(formValue());
        HideRequiredTxt();
    }
    get_Item();
    saveData();
    btnClear.style.display = "none"; 
    clearData();
  });
// ------ Show Btn-CLear when input task title-----
task.addEventListener("keypress",function(){
  btnClear.style.display = "block";
  Trequired.style.display = "none";
  task.style.border = "none";
})
  date.addEventListener("input",function(){
  Drequired.style.display = "none";
  date.style.border = "none";
})
  des.addEventListener("keypress",function(){
  btnClear.style.display = "block";
 })
  
function ShowRequiredTxt(){
  task.style.border = "1px solid red";
  date.style.border = "1px solid red";
  Trequired.style.display = "block";
  Drequired.style.display = "block";
}

function HideRequiredTxt(){
  task.style.border = "none";
  date.style.border = "none";
  des.style.border = "none";
  Trequired.style.display = "none";
  Drequired.style.display = "none";
}

  function clearData(){
      task.value = "";
      prio.value = "normal";
      date.value = "";
      des.value = "";
      HideRequiredTxt();
      task.focus();
  };


// -------Update Data--------
  btnUpdate.addEventListener("click",function(){
    if(task.value == ''){
      task.focus();
      return(task);
    }else if(date.value == ''){
      date.focus();
      return(date);
    }else{
      itemList[i2]['task'] = task.value;
      itemList[i2]['priority'] = prio.value;
      itemList[i2]['date'] = date.value;
      itemList[i2]['description'] = des.value;
      
      get_Item();
      saveData();
      btnAdd.style.display = "block";
      btnUpdate.style.display = "none";
      clearData();
    }
   
  });

// -----Clear form Data-----
btnClear.addEventListener("click",function(){
    clearData();
        btnClear.style.display = "none";
    
  });
// -------Pop up alert box when pressing delete icon------
btnYes.addEventListener("click",function(){
  alertBox.style.display = "none";
})
btnNo.addEventListener("click",function(){
  alertBox.style.display = "none";
})

// ------disable previous dates in Input date type-------
  window.addEventListener('DOMContentLoaded', function() {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    document.getElementById('date').setAttribute('min', maxDate);
});
// -----Dark Mode-----
DarkMode.addEventListener("click",function(){
  document.body.classList.toggle("dark-theme");
})

// ------Search Option------
mySearch.addEventListener("keyup",function(){
  // Declare variables 
  var input, filter, table, tr, i, j, column_length, count_td;
  column_length = document.getElementById('taskTable').rows[0].cells.length;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("taskTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) { 
    count_td = 0;
    for(j = 0; j < column_length-1; j++){
        td = tr[i].getElementsByTagName("td")[j];
        if (td) {
          if ( td.innerHTML.toUpperCase().indexOf(filter) > -1)  {            
            count_td++;
          }
        }
    }
    if(count_td > 0){
        tr[i].style.display = "";
    } else {
        tr[i].style.display = "none";
    }
  }
})

  //  --------Priority color status---------
  function PriorityColorStatus(){
    const statusColumnIndex = 1;
    const statusColorCodes = {
      urgent: 'status-urgent',
      anytime: 'status-anytime',
      normal: 'status-normal',
    }; 
    const tableCells = document.querySelectorAll('#taskTable td:nth-child(' + (statusColumnIndex + 2) + ')'); 
    tableCells.forEach(function(cell) {
      const status = cell.textContent.toLowerCase(); 
      const colorClass = statusColorCodes[status]; 
      if (colorClass) {
        cell.classList.add(colorClass); 
      }
    });
  
  }
     


