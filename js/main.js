// Sanad - Main JavaScript File

// 1. Data Arrays (Simulating a Database)
const areas = [
  "Al-Rimal North",
  "Al-Rimal South",
  "Tal Al-Hawa",
  "Sheikh Ajleen",
  "Al-Nasr",
  "Sheikh Radwan",
  "Al-Karama",
  "Al-Zaytoun",
  "Al-Shuja'iya",
  "Al-Tuffah",
  "Al-Daraj",
  "Al-Zarqa",
  "Al-Sabra",
  "Al-Yarmouk",
  "Gaza Port",
  "Islamic University Area",
  "Al-Majma Al-Islami",
  "Al-Sahaba",
  "Al-Sham'a",
  "Al-Turkmen",
  "Asqula",
  "Al-Sha'af",
  "Al-Safa",
  "Bir Al-Na'ja"
];

const servicesData = [
    {
        id: 1,
        title: "Emergency Medical Kits",
        category: "Medical",
        description: "Distribution of essential first-aid and surgical supplies to field hospitals.",
        image: "assets/images/aid_1.jpg"
    },
    {
        id: 2,
        title: "Food Packages",
        category: "Food",
        description: "Nutritious non-perishable food parcels for families in displaced areas.",
        image: "assets/images/gaza_2.jpg"
    },
    {
        id: 3,
        title: "Clean Water Supply",
        category: "Food",
        description: "Mobile water tankers delivering potable water to camps.",
        image: "assets/images/gaza_3.jpg"
    },
    {
        id: 4,
        title: "Emergency Shelter Tents",
        category: "Shelter",
        description: "Weather-resistant tents and bedding for displaced families.",
        image: "assets/images/gaza_4.jpg"
    },
    {
        id: 5,
        title: "Mobile Clinics",
        category: "Medical",
        description: "Roving medical teams providing check-ups and urgent care.",
        image: "assets/images/gaza_5.jpg"
    },
    {
        id: 6,
        title: "Winterization Kits",
        category: "Shelter",
        description: "Blankets, heaters, and warm clothing for winter months.",
        image: "assets/images/gaza_6.jpg"
    }
];

const aidRequestsData = [
    { id: "REQ-001", type: "Medical", location: "Al-Rimal North", urgency: "High", status: "Pending" },
    { id: "REQ-002", type: "Food", location: "Tal Al-Hawa", urgency: "Medium", status: "Approved" },
    { id: "REQ-003", type: "Shelter", location: "Sheikh Radwan", urgency: "High", status: "Processing" },
    { id: "REQ-004", type: "Medical", location: "Al-Zaytoun", urgency: "Critical", status: "Pending" },
    { id: "REQ-005", type: "Food", location: "Gaza Port", urgency: "Low", status: "Approved" }
];

// 2.  (jQuery)
$(document).ready(function() {
    console.log("Sanad Application Initialized");

    // --- Services ---
    function renderServices(filter = "all") {
        const container = $("#services-container");
        container.empty(); // Clear existing content

        servicesData.forEach(service => {
            if (filter === "all" || service.category === filter) {
                const cardHTML = `
                    <div class="col-md-4 service-item" data-category="${service.category}">
                        <div class="card service-card shadow-sm h-100">
                            <img src="${service.image}" class="card-img-top" alt="${service.title}">
                            <div class="card-body">
                                <span class="card-category text-muted mb-2 d-block">${service.category}</span>
                                <h5 class="card-title fw-bold">${service.title}</h5>
                                <p class="card-text">${service.description}</p>
                            </div>
                        </div>
                    </div>
                `;
             
                $(cardHTML).appendTo(container).hide().fadeIn(600);
            }
        });
    }

   
    renderServices();

 
    $(".filter-btn").click(function() {
      
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        const category = $(this).data("filter");
        renderServices(category);
    });

    // ---  Filter for Areas ---
    function renderAreaFilter() {
        const filterContainer = $("#area-filter-container");
        filterContainer.empty();
        
        const allBtn = `<button class="btn btn-sm btn-outline-secondary area-filter-btn active" data-area="all">All Areas</button>`;
        filterContainer.append(allBtn);

        areas.forEach(area => {
            const btn = `<button class="btn btn-sm btn-outline-secondary area-filter-btn" data-area="${area}">${area}</button>`;
            filterContainer.append(btn);
        });

        // Add event listener
        $(".area-filter-btn").click(function() {
            $(".area-filter-btn").removeClass("active");
            $(this).addClass("active");
            const area = $(this).data("area");
            renderTable(area);
        });
    }

    renderAreaFilter();

    
    function renderTable(areaFilter = "all") {
        const tbody = $("#aid-table-body");
        tbody.empty();

        aidRequestsData.forEach(request => {
            if (areaFilter === "all" || request.location === areaFilter) {
                let urgencyClass = request.urgency === "High" || request.urgency === "Critical" ? "badge-urgent" : "badge-normal";
                
                const rowHTML = `
                    <tr>
                        <td>${request.id}</td>
                        <td>${request.type}</td>
                        <td>${request.location}</td>
                        <td><span class="badge ${urgencyClass}">${request.urgency}</span></td>
                        <td>${request.status}</td>
                    </tr>
                `;
                tbody.append(rowHTML);
            }
        });
    }

    renderTable();

  
    function populateLocations() {
        const select = $("#location");
        areas.forEach(area => {
            select.append(`<option value="${area}">${area}</option>`);
        });
    }
    populateLocations();

    // Form Validation & Submission 
    $("#aid-request-form").submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        event.stopPropagation();

        const form = this;
        
        // Bootstrap  validation
        if (!form.checkValidity()) {
            $(form).addClass("was-validated");
            return;
        }

        // Logic if valid
        const name = $("#name").val();
        const location = $("#location").val();
        const type = $("#type").val();
        const urgency = "High"; // Default for new web requests

        // Simulate adding to data (DOM Manipulation)
        const newId = `REQ-00${aidRequestsData.length + 1}`;
        const newRequest = { id: newId, type: type, location: location, urgency: urgency, status: "Pending" };
        
        // Add to array
        aidRequestsData.push(newRequest);
        
        // Re-render table to show new request
        renderTable();

        // Animation: Fade out form, Fade in success
        $(form).slideUp(500, function() {
            $("#form-feedback").removeClass("d-none").hide().slideDown(500);
            
            // Optional: Reset form after delay
            setTimeout(() => {
                form.reset();
                $(form).removeClass("was-validated");
                $("#form-feedback").slideUp(500, function() {
                    $(form).slideDown(500);
                });
            }, 3000);
        });

        console.log("New Request Submitted:", newRequest);
    });

    //  (jQuery) 
   
    $('a.nav-link[href^="#"], .cta-btn[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

});