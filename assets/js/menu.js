function debts(){
  var debts = document.getElementById("debts-drop");
  var add = document.getElementById("add-drop");
  var data = document.getElementById("data-drop");
  if (document.querySelector("#debts-drop").classList.contains("hidden")) {
    debts.className = debts.className.replace(/\bhidden\b/g, "open");
    add.className = add.className.replace(/\bopen\b/g, "hidden");
    data.className = data.className.replace(/\bopen\b/g, "hidden");
    $('.chart').empty();
    debtChart();
  } else {
    debts.className = debts.className.replace(/\bopen\b/g, "hidden");
  }
}
function add(){
  var add = document.getElementById("add-drop");
  var debts = document.getElementById("debts-drop");
  var data = document.getElementById("data-drop");
  if (document.querySelector("#add-drop").classList.contains("hidden")) {
    add.className = add.className.replace(/\bhidden\b/g, "open");
    debts.className = debts.className.replace(/\bopen\b/g, "hidden");
    data.className = data.className.replace(/\bopen\b/g, "hidden");
    $('.chart').empty();
  } else {
    add.className = add.className.replace(/\bopen\b/g, "hidden");
  }
}
function data(){
  var data = document.getElementById("data-drop");
  var add = document.getElementById("add-drop");
  var debts = document.getElementById("debts-drop");
  if (document.querySelector("#data-drop").classList.contains("hidden")) {
    data.className = data.className.replace(/\bhidden\b/g, "open");
    dataChart();
    add.className = add.className.replace(/\bopen\b/g, "hidden");
    debts.className = debts.className.replace(/\bopen\b/g, "hidden");
  } else {
    data.className = data.className.replace(/\bopen\b/g, "hidden");
    $('.chart').empty();
  }
}
