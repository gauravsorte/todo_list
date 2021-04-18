
    // console.log("Working");
    let add = document.getElementById('add')
    // console.log(add);
    add.addEventListener('click', update)

    function update() {
      // console.log("Click On Add Item Button Working");
      let tit = document.getElementById('title').value
      let desc = document.getElementById('desc').value
      let pref = document.getElementById('inputCategory').value;
      let date_ = document.getElementById('end-date').value;
      
      var d = new Date(date_)
     
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      var d1 = new Date(today);

      if (tit == '' || tit == null) {
        alert('Please Enter The Task!!')
        return
      }

      if (desc == '' || desc == null) {
        alert('Please Enter The Task Description!!')
        return
      }

      if (pref == 'Choose...') {
        alert('Please Select The preference1!')
        return
      }
      if (date_ == '' || date_ == null) {
        alert('Please Enter The deadline of the Task!!')
        return
      }

      difference_in_time = d.getTime() - d1.getTime();
      if(Math.floor(difference_in_time / (1000 * 3600 * 24)) < 0) {
        alert(`Please select todays date or Date after ${today} 'mm/dd/yyyy' date`)
        return
      }
      


      //   console.log(tit, desc, 'pref - > ',pref)
      if (localStorage.getItem('itemJson') == null) {
        // console.log('First Time')
        let itemJsonArray = []
        itemJsonArray.push([tit, desc, date_,pref])
        // [['1','11']]
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
      } else {
        // console.log('Second..... Time')
        itemJsonArrayStr = localStorage.getItem('itemJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)
        //[[1,11],[2,22]]
        itemJsonArray.push([tit, desc,date_, pref])
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
      }


      document.getElementById('title').value = ''
      document.getElementById('desc').value = ''
      document.getElementById('inputCategory').value = 'Choose...'
      document.getElementById('end-date').value = ''


      populate()
    }

    function populate() {
      tb = document.getElementById('tb')

      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      var d1 = new Date(today);

      let str = ''
      if (localStorage.getItem('itemJson') != null && localStorage.getItem('itemJson') != "[]" ) {
        itemJsonArrayStr = localStorage.getItem('itemJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)

        itemJsonArray.forEach((element, index) => {
        
          var d2 = new Date(element[2])
          difference_in_time = d2.getTime() - d1.getTime();
          if (element[3] == 'high') {
            str += `
                <tr class="child new-item pref-high">
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td class="remain-time">${Math.floor(difference_in_time / (1000 * 3600 * 24))}</td>
                    <td> <button  class="btn btn-primary btn-sm my-1 edit-button" onclick="edit_list(${index})"><img src="https://img.icons8.com/dusk/25/000000/edit--v1.png"/></button> 
                         <button  class="btn btn-danger btn-sm delete-button" onclick="deleted(${index})"><img src="https://img.icons8.com/dusk/25/000000/filled-trash.png"/></button></td>
                </tr>`
          } else if (element[3] == 'medium') {
            str += `
                <tr class="child new-item pref-medium">
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td class="remain-time">${Math.floor(difference_in_time / (1000 * 3600 * 24))} </td>
                    <td> <button  class="btn btn-primary btn-sm my-1 edit-button" onclick="edit_list(${index})"><img src="https://img.icons8.com/dusk/25/000000/edit--v1.png"/></button> 
                    <button  class="btn btn-danger btn-sm delete-button" onclick="deleted(${index})"><img src="https://img.icons8.com/dusk/25/000000/filled-trash.png"/></button></td>
                </tr>`
          } else if (element[3] == 'low') {
            str += `
                <tr class="child new-item pref-low">
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td class="remain-time">${Math.floor(difference_in_time / (1000 * 3600 * 24))} </td>
                    <td> <button  class="btn btn-primary btn-sm my-1 edit-button" onclick="edit_list(${index})"><img src="https://img.icons8.com/dusk/25/000000/edit--v1.png"/></button> 
                    <button  class="btn btn-danger btn-sm delete-button" onclick="deleted(${index})"><img src="https://img.icons8.com/dusk/25/000000/filled-trash.png"/></button></td>
                </tr>`
          }

        })
        // console.log(str);
        tb.innerHTML = str
      } else {
          str = ''
          str += `
          <tr class="child new-item pref-low">
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td> <div class="empty_list text-center my-2 "><img src="https://img.icons8.com/dusk/100/000000/add-list.png"/>
                    Empty List</div></td>
             </tr>`
           
          tb.innerHTML = str
        }
    }


    populate()

    function clear_cart() {
      localStorage.clear()
      populate()
    }

    function deleted(itemIndex) {
      //   console.log('Deleted', itemIndex)
      itemJsonArrayStr = localStorage.getItem('itemJson')
      itemJsonArray = JSON.parse(itemJsonArrayStr)
      itemJsonArray.splice(itemIndex, 1)
      localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
      populate()
    }

    function edit_list(itemIndex) {
        if(localStorage.getItem('itemJson') != null) {
            itemJsonArrayStr = localStorage.getItem('itemJson')
            itemJsonArray = JSON.parse(itemJsonArrayStr)

            itemJsonArray.forEach((element, index) => {
                if(index == itemIndex) {
                    document.getElementById('title').value = element[0]
                    document.getElementById('desc').value = element[1]
                    document.getElementById('end-date').value = element[2]
                    document.getElementById('inputCategory').value = element[3]
                    
                    deleted(itemIndex)
                   
                }
            })
        }

    }
