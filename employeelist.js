const db = require('./employeelist.model.js')

const remote_url = 'http://admin:admin@127.0.0.1:5984/employeedb';

const showAddModal = () => {
  console.log(db);
  let form = document.getElementById('employee-list-add')
  form.reset()
  document.body.className += ' ' + form.id
}

const deleteEmployee = (empId) => {
  db.get(empId).then(function(empObj){
    db.remove(empObj).then(function(success){
      console.log(success);
      document.querySelector('main .row').innerHTML = '';
      loadEmployees();
    }).catch(function(err) {
      console.log(response);
    });
  })
  
}

const loadEmployees = () => {
  db.allDocs({
    include_docs: true,
  }).then(function(results) {
    console.log(results);
    results.rows.forEach(function(row){
      console.log(row.doc);
      let empObj = row.doc;
      let empTemplate = document.querySelector("#employeeCard");
      empTemplate.content.querySelector('h5').innerHTML = empObj.name;
      if (empObj.designation !== '') {
        empTemplate.content.querySelector('h4').innerHTML = empObj.designation;
      }
      
      if (empObj.mobileno !== ''  && empObj.mailId !== '') {
        let contact = empObj.mobileno + '|' +  empObj.mailId;
        empTemplate.content.querySelector('.contact').innerHTML = contact;
      }
      empTemplate.content.querySelector('a').setAttribute("onclick", "deleteEmployee('" + empObj._id + "')");
      console.log(empTemplate.content.querySelector('a'));
      let clone = document.importNode(empTemplate.content, true);
      document.querySelector('main .row').appendChild(clone);

    });
  }).catch(function(){
    console.log("not able to read the pouch db");
  })
}

const saveEmployee = (element) => {
  console.log(event);
  const elements = event.target.elements;
  const employeeObj = {};
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].tagName.toLowerCase() !== 'button') {
      employeeObj[elements[i].name] = elements[i].value
    }
  }
  console.log(employeeObj);
  db.addEmployee(employeeObj);
}

const syncModal = () => {
  db.sync(remote_url).on('complete', function() {
    console.log('completeted db sync to remote api');
  }).on('error', function() {
    console.log('error in sync');
  });
}

const closeModal = () => {
  let classNames = document.body.className;
  document.body.className = classNames.replace('employee-list-add', '');;
}