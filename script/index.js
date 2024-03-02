const loadHub = async(isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const phones = data.data;
    const hubArray = phones.tools;
    // console.log(hubArray);
    displayHub(hubArray)

}

const displayHub = (hubArray) => {
    const phoneContainer = document.getElementById('phone-container');
    hubArray.forEach(element => {
        // console.log(element);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        // set inner Html
        phoneCard.innerHTML = `
        <figure><img src="${element?.image}"
                            alt="AI" /></figure>
        <div class="card-body">
           <h2 class="card-title">${element.name}</h2>
           <ol>
           <li>${element.features[0]}</li>
           <li>${element.features[1]}</li>
           <li>${element?.features[2]}</li>
           </ol>
           
           <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${element.id}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;

        // 4 appeneChild
        phoneContainer.appendChild(phoneCard);
    });
}


const handleShowDetail = async (id) =>{
    // console.log('Cliked show Details',id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const phone = data.data
    console.log(phone);
    showPhoneDetals(phone)

}

const showPhoneDetals = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.tool_name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img src ="${phone.image_link[0]}" alt="" />
    <p class="text-2xl">${phone.input_output_examples[0].input}</p>
    <p>${phone.input_output_examples[1].output}</p>

    `

    //show the modal
    show_details_modal.showModal();
}
loadHub();