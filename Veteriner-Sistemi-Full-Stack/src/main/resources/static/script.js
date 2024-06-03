const API_URL = 'http://localhost:8080/api/v1';

document.addEventListener('DOMContentLoaded', () => {
    // Toggle panel visibility
    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const target = document.querySelector(toggle.getAttribute('data-target'));
            if (target.style.display === 'none' || target.style.display === '') {
                target.style.display = 'block';
            } else {
                target.style.display = 'none';
            }
        });
    });

    const customerList = document.getElementById('customerList');
    const animalList = document.getElementById('animalList');
    const vaccineList = document.getElementById('vaccineList');
    const doctorList = document.getElementById('doctorList');
    const availableDateList = document.getElementById('availableDateList');
    const appointmentList = document.getElementById('appointmentList');

    const customerName = document.getElementById('customerName');
    const customerEmail = document.getElementById('customerEmail');
    const customerPhone = document.getElementById('customerPhone');
    const customerAddress = document.getElementById('customerAddress');
    const customerCity = document.getElementById('customerCity');
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const updateCustomerBtn = document.getElementById('updateCustomerBtn');
    const deleteCustomerBtn = document.getElementById('deleteCustomerBtn');

    const animalName = document.getElementById('animalName');
    const animalSpecies = document.getElementById('animalSpecies');
    const animalBreed = document.getElementById('animalBreed');
    const animalColour = document.getElementById('animalColour');
    const animalDOB = document.getElementById('animalDOB');
    const animalGender = document.getElementById('animalGender');
    const animalOwner = document.getElementById('animalOwner');
    const addAnimalBtn = document.getElementById('addAnimalBtn');
    const updateAnimalBtn = document.getElementById('updateAnimalBtn');
    const deleteAnimalBtn = document.getElementById('deleteAnimalBtn');

    const vaccineName = document.getElementById('vaccineName');
    const vaccineCode = document.getElementById('vaccineCode');
    const vaccineProtectionStart = document.getElementById('vaccineProtectionStart');
    const vaccineProtectionEnd = document.getElementById('vaccineProtectionEnd');
    const vaccineAnimal = document.getElementById('vaccineAnimal');
    const addVaccineBtn = document.getElementById('addVaccineBtn');
    const updateVaccineBtn = document.getElementById('updateVaccineBtn');
    const deleteVaccineBtn = document.getElementById('deleteVaccineBtn');

    const doctorName = document.getElementById('doctorName');
    const doctorPhone = document.getElementById('doctorPhone');
    const doctorEmail = document.getElementById('doctorEmail');
    const doctorAddress = document.getElementById('doctorAddress');
    const doctorCity = document.getElementById('doctorCity');
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    const updateDoctorBtn = document.getElementById('updateDoctorBtn');
    const deleteDoctorBtn = document.getElementById('deleteDoctorBtn');

    const availableDate = document.getElementById('availableDate');
    const availableDoctor = document.getElementById('availableDoctor');
    const addAvailableDateBtn = document.getElementById('addAvailableDateBtn');
    const updateAvailableDateBtn = document.getElementById('updateAvailableDateBtn');
    const deleteAvailableDateBtn = document.getElementById('deleteAvailableDateBtn');

    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentAnimal = document.getElementById('appointmentAnimal');
    const appointmentDoctor = document.getElementById('appointmentDoctor');
    const addAppointmentBtn = document.getElementById('addAppointmentBtn');
    const updateAppointmentBtn = document.getElementById('updateAppointmentBtn');
    const deleteAppointmentBtn = document.getElementById('deleteAppointmentBtn');

    // Fetch and display data
    const fetchData = async () => {
        await fetchAndDisplayCustomers();
        await fetchAndDisplayAnimals();
        await fetchAndDisplayVaccines();
        await fetchAndDisplayDoctors();
        await fetchAndDisplayAvailableDates();
        await fetchAndDisplayAppointments();
    };

    const fetchAndDisplayCustomers = async () => {
        const response = await fetch(`${API_URL}/customers`);
        const customers = await response.json();
        customerList.innerHTML = '';
        customers.forEach(customer => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${customer.name} (${customer.email})
                <button class="update" data-id="${customer.id}">Update</button>
                <button class="delete" data-id="${customer.id}">Delete</button>
            `;
            customerList.appendChild(li);
        });
        addUpdateDeleteListeners(customerList, 'customers', fetchAndDisplayCustomers);
    };

    const fetchAndDisplayAnimals = async () => {
        const response = await fetch(`${API_URL}/animals`);
        const animals = await response.json();
        animalList.innerHTML = '';
        animals.forEach(animal => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${animal.name} (${animal.species})
                <button class="update" data-id="${animal.id}">Update</button>
                <button class="delete" data-id="${animal.id}">Delete</button>
            `;
            animalList.appendChild(li);
        });
        addUpdateDeleteListeners(animalList, 'animals', fetchAndDisplayAnimals);
    };

    const fetchAndDisplayVaccines = async () => {
        const response = await fetch(`${API_URL}/vaccines`);
        const vaccines = await response.json();
        vaccineList.innerHTML = '';
        vaccines.forEach(vaccine => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${vaccine.name} (Animal ID: ${vaccine.animal.id})
                <button class="update" data-id="${vaccine.id}">Update</button>
                <button class="delete" data-id="${vaccine.id}">Delete</button>
            `;
            vaccineList.appendChild(li);
        });
        addUpdateDeleteListeners(vaccineList, 'vaccines', fetchAndDisplayVaccines);
    };

    const fetchAndDisplayDoctors = async () => {
        const response = await fetch(`${API_URL}/doctors`);
        const doctors = await response.json();
        doctorList.innerHTML = '';
        doctors.forEach(doctor => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${doctor.name} (${doctor.email})
                <button class="update" data-id="${doctor.id}">Update</button>
                <button class="delete" data-id="${doctor.id}">Delete</button>
            `;
            doctorList.appendChild(li);
        });
        addUpdateDeleteListeners(doctorList, 'doctors', fetchAndDisplayDoctors);
    };

    const fetchAndDisplayAvailableDates = async () => {
        const response = await fetch(`${API_URL}/available_dates`);
        const availableDates = await response.json();
        availableDateList.innerHTML = '';
        availableDates.forEach(availableDate => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${availableDate.availableDate} (Doctor ID: ${availableDate.doctor.id})
                <button class="update" data-id="${availableDate.id}">Update</button>
                <button class="delete" data-id="${availableDate.id}">Delete</button>
            `;
            availableDateList.appendChild(li);
        });
        addUpdateDeleteListeners(availableDateList, 'available_dates', fetchAndDisplayAvailableDates);
    };

    const fetchAndDisplayAppointments = async () => {
        const response = await fetch(`${API_URL}/appointments`);
        const appointments = await response.json();
        appointmentList.innerHTML = '';
        appointments.forEach(appointment => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${appointment.appointmentDateTime} (Animal ID: ${appointment.animal.id}, Doctor ID: ${appointment.doctor.id})
                <button class="update" data-id="${appointment.id}">Update</button>
                <button class="delete" data-id="${appointment.id}">Delete</button>
            `;
            appointmentList.appendChild(li);
        });
        addUpdateDeleteListeners(appointmentList, 'appointments', fetchAndDisplayAppointments);
    };

    const addUpdateDeleteListeners = (listElement, entityType, fetchFunction) => {
        listElement.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const newValue = prompt(`Enter new value for ${entityType} (JSON format):`);
                if (newValue) {
                    await fetch(`${API_URL}/${entityType}/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: newValue
                    });
                    fetchFunction();
                }
            });
        });

        listElement.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                await fetch(`${API_URL}/${entityType}/${id}`, {
                    method: 'DELETE'
                });
                fetchFunction();
            });
        });
    };

   addCustomerBtn.addEventListener('click', async () => {
       const name = customerName.value;
       const email = customerEmail.value;
       const phone = customerPhone.value;
       const address = customerAddress.value;
       const city = customerCity.value;
       if (name && email && phone && address && city) {
           await fetch(`${API_URL}/customers`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({ name, email, phone, address, city })
           });
           customerName.value = '';
           customerEmail.value = '';
           customerPhone.value = '';
           customerAddress.value = '';
           customerCity.value = '';
           fetchAndDisplayCustomers();
       }
   });

    addAnimalBtn.addEventListener('click', async () => {
        const name = animalName.value;
        const species = animalSpecies.value;
        const breed = animalBreed.value;
        const colour = animalColour.value;
        const dateOfBirth = animalDOB.value;
        const gender = animalGender.value;
        const ownerId = animalOwner.value;
        if (name && species && breed && colour && dateOfBirth && gender && ownerId) {
            await fetch(`${API_URL}/animals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, species, breed, colour, dateOfBirth, gender, owner: { id: ownerId } })
            });
            animalName.value = '';
            animalSpecies.value = '';
            animalBreed.value = '';
            animalColour.value = '';
            animalDOB.value = '';
            animalGender.value = '';
            animalOwner.value = '';
            fetchAndDisplayAnimals();
        }
    });

    addVaccineBtn.addEventListener('click', async () => {
        const name = vaccineName.value;
        const code = vaccineCode.value;
        const protectionStartDate = vaccineProtectionStart.value;
        const protectionEndDate = vaccineProtectionEnd.value;
        const animalId = vaccineAnimal.value;
        if (name && code && protectionStartDate && protectionEndDate && animalId) {
            await fetch(`${API_URL}/vaccines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, code, protectionStartDate, protectionEndDate, animal: { id: animalId } })
            });
            vaccineName.value = '';
            vaccineCode.value = '';
            vaccineProtectionStart.value = '';
            vaccineProtectionEnd.value = '';
            vaccineAnimal.value = '';
            fetchAndDisplayVaccines();
        }
    });

    addDoctorBtn.addEventListener('click', async () => {
        const name = doctorName.value;
        const phone = doctorPhone.value;
        const email = doctorEmail.value;
        const address = doctorAddress.value;
        const city = doctorCity.value;
        if (name && phone && email && address && city) {
            await fetch(`${API_URL}/doctors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, email, address, city })
            });
            doctorName.value = '';
            doctorPhone.value = '';
            doctorEmail.value = '';
            doctorAddress.value = '';
            doctorCity.value = '';
            fetchAndDisplayDoctors();
        }
    });

    addAvailableDateBtn.addEventListener('click', async () => {
        const date = availableDate.value;
        const doctorId = availableDoctor.value;
        if (date && doctorId) {
            await fetch(`${API_URL}/available_dates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ availableDate: date, doctor: { id: doctorId } })
            });
            availableDate.value = '';
            availableDoctor.value = '';
            fetchAndDisplayAvailableDates();
        }
    });

    addAppointmentBtn.addEventListener('click', async () => {
        const date = appointmentDate.value;
        const animalId = appointmentAnimal.value;
        const doctorId = appointmentDoctor.value;
        if (date && animalId && doctorId) {
            await fetch(`${API_URL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ appointmentDateTime: date, animal: { id: animalId }, doctor: { id: doctorId } })
            });
            appointmentDate.value = '';
            appointmentAnimal.value = '';
            appointmentDoctor.value = '';
            fetchAndDisplayAppointments();
        }
    });

    fetchData();
});