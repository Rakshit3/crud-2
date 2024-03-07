document.addEventListener("DOMContentLoaded", function() {
    var addBtn = document.querySelector('#add-btn');
    var modal = document.querySelector('.modal');
    var closeModalBtn = document.querySelector('.closeicon');
    var registerBtn = document.querySelector('.Reg');
    var table = document.querySelector('#tableone');
    var idInput = document.querySelector('#id');
    var nameInput = document.querySelector('#name');
    var lastNameInput = document.querySelector('#lastname');
    var jobTitleInput = document.querySelector('#jobtittle');
    var officeCodeInput = document.querySelector('#officecode');
    var fileInput = document.querySelector('#fileInput');
    var imagePreview1 = document.querySelector('.imagebox img');
    var imagePreview = document.querySelector('.image-preview');
    var editbtn;



    var userData = JSON.parse(localStorage.getItem('userData')) || [];
  




   

    // Function to display data in the table
    function displayData() {
        table.innerHTML = `
            <tr>
                <th>Sr no</th>
                <th>Profile</th>
                <th>ID</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Job Title</th>
                <th>Office Code</th>
                <th>Action</th>
            </tr>
        `;
        userData.forEach(function(data, index) {
            table.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><img src="${data.profile}" width="50" height="50" alt="image yha hai"></td>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.lastName}</td>
                    <td>${data.jobTitle}</td>
                    <td>${data.officeCode}</td>
                    <td>
                        <button class="edit-btn"><i class="fa fa-eye"> </i></button>
                        <button class="fa fa-trash" data-index="${index}"></button>
                    </td>
                </tr>
            `;
        });

        var editbtn = document.querySelectorAll(".edit-btn");
        for(var i=0; i<=editbtn.length; i++){
              editbtn[i].onclick = function()
              {
                alert()
              }
           }
         
    }


 

    // Function to add new user data
    function addUser() {
        if (idInput.value === '' || nameInput.value === '' || lastNameInput.value === '' || jobTitleInput.value === '' || officeCodeInput.value === '') {
            document.getElementById("id1").innerHTML = (" ** ID NOT WILL BE BLANKED");
            document.getElementById("name1").innerHTML = (" ** NAME NOT WILL BE BLANKED");
            document.getElementById("lastname1").innerHTML = (" ** LAST NAME NOT WILL BE BLANKED");
            document.getElementById("jobtittle1").innerHTML = (" **  JOB TITTLE NOT WILL BE BLANKED");
            document.getElementById("officecode1").innerHTML = (" **  OFFICE CODE NOT WILL BE BLANKED");
            return true;
          
        }
        var newUser = {
            id: idInput.value,
            name: nameInput.value,
            lastName: lastNameInput.value,
            jobTitle: jobTitleInput.value,
            officeCode: officeCodeInput.value,
            profile: imagePreview1.src // You can store image URL here
        };
        userData.push(newUser);
        // localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(userData));
        modal.classList.remove("active");
        document.getElementById("form1").reset();
        imagePreview.src = imagePreview1.rcs = fileInput.value = ''; // Clear the image preview after adding a user
        setTimeout(() => {
            swal("Good job!", "Your registration is completed", "success")
            displayData();
        }, 600)


    }

    // Function to delete user data
    function deleteUser(index) {
        userData.splice(index, 1);
        localStorage.setItem('userData', JSON.stringify(userData));
        displayData();
    }

    // Event listeners
    addBtn.addEventListener('click', function() {
        modal.classList.add("active");
    });

    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove("active");
        imagePreview.src = ''; // Clear the image preview when closing the modal
    });

    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addUser();
    });

    table.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-trash')) {
            var index = e.target.getAttribute('data-index');
            deleteUser(index);
        }
    });

    fileInput.addEventListener('change', function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            imagePreview1.src = e.target.result; // Display the selected image in the preview
        };
        reader.readAsDataURL(file);
    });
    fileInput.addEventListener('change', function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageUrl = e.target.result;
            // Display the selected image in the modal
            imagePreview.src = imageUrl;
            // Display the selected image in the profile section
            imagePreview1.src = imageUrl;
        };
        reader.readAsDataURL(file);
    });
    

    // Initial display of data
    displayData();
});



