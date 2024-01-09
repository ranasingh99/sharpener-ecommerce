var totalamt = 0;
function showDetails(e){
    e.preventDefault();
    let sprice = e.target.spItem.value;
    let pname = e.target.nameItem.value;

    const productDetails = {
        sellingPrice :sprice,
        productName :pname
    }
    
    // sending the data over cloud using POST request

    axios.post('https://crudcrud.com/api/2d1450789eb3427aaa5e741a71b220fd/productContainer',productDetails)
    .then((response)=>{
       // totalamt = totalamt + response.data.sellingPrice;
        showProductDetails(response.data);
     //console.log(response.data);
    })
    .catch((error)=>{
     document.body.innerHTML = document.body.innerHTML + `<h3 style = "color:red;">Error code:404 - Something went wrong</h3>`
    });
}
// show complete list of products

function showList(){
    axios.get('https://crudcrud.com/api/2d1450789eb3427aaa5e741a71b220fd/productContainer')
    .then((res)=>{
        for(var i =0;i<res.data.length;i++){
            showProductDetails(res.data[i]);
        }
    })
    .catch((err)=>{
        document.body.innerHTML = document.body.innerHTML + `<h3>Something went wrong</h3>`
    });
    

}

// function for showing the details

function showProductDetails(pro_obj){
    let parentElement = document.getElementById('listOfItem');

    let childElement = document.createElement('li');

    // Adding the textcontent of user to the childelement
    //let sumOfamt = sumOfamt + pro_obj.sellingPrice;

    childElement.textContent = pro_obj.sellingPrice + "  "+pro_obj.productName;

    // calculating total amout of all products

     totalamt = totalamt + parseInt(pro_obj.sellingPrice);
   

     //==========now adding the delete button to it==============//
     let deleteButton = document.createElement('input');
     deleteButton.type = 'button';
     deleteButton.value = 'X';
     deleteButton.className = 'btn-1';

     
    // Adding color to the delete button and edit button//
    deleteButton.style.color = 'red';

    deleteButton.onclick = ()=>{

       //===================deleteing from the crucrud using DELETE request=======

       axios.delete(`https://crudcrud.com/api/2d1450789eb3427aaa5e741a71b220fd/productContainer/${pro_obj._id}`)
       .then((res)=>{
        console.log('object deleted');
       })
       .catch((err)=>{
        console.log('something went wrong');
       })

        // removing from the dom

        parentElement.removeChild(childElement);

    }

    childElement.appendChild(deleteButton);
    parentElement.appendChild(childElement);

     document.getElementById('total').innerText = totalamt;
    
}


