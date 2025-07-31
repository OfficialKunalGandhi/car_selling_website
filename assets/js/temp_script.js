      // Firebase configuration - Replace with your Firebase config
      const firebaseConfig = {
        apiKey: "AIzaSyDlRSQJzFqrL-QENTJruiUltcdscOCdGNw",
        authDomain: "gym-app-bd9c1.firebaseapp.com",
        projectId: "gym-app-bd9c1",
        storageBucket: "gym-app-bd9c1.firebasestorage.app",
        messagingSenderId: "417740582785",
        appId: "1:417740582785:web:79815f97de1bda79454280",
        measurementId: "G-T4YJQDXL08"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();

      // Function to load team members from Firebase
      async function loadTeamMembers() {
        const teamContainer = document.getElementById('team-container');
        
        try {
          const snapshot = await db.collection('team').orderBy('order', 'asc').get();
          
          if (snapshot.empty) {
            teamContainer.innerHTML = `
              <div class="flex items-center justify-center p-8 col-span-full">
                <div class="text-[#92aec8] text-base">No team members found.</div>
              </div>
            `;
            return;
          }

          teamContainer.innerHTML = ''; // Clear loading message
          
          snapshot.forEach(doc => {
            const member = doc.data();
            const memberElement = createTeamMemberElement(member, doc.id);
            teamContainer.appendChild(memberElement);
          });
        } catch (error) {
          console.error('Error loading team members:', error);
          teamContainer.innerHTML = `
            <div class="flex items-center justify-center p-8 col-span-full">
              <div class="text-red-400 text-base">Error loading team members. Please check your Firebase configuration.</div>
            </div>
          `;
        }
      }

      // Function to create team member element
      function createTeamMemberElement(member, memberId) {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'flex flex-col gap-3 text-center pb-3 team-member cursor-pointer transition-transform hover:scale-105';
        memberDiv.setAttribute('data-member-id', memberId);
        
        memberDiv.innerHTML = `
          <div class="px-4">
            <div
              class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-transparent hover:border-[#1473cc] transition-colors"
              style="background-image: url('${member.photo || 'https://via.placeholder.com/150x150?text=No+Photo'}');"
            ></div>
          </div>
          <div>
            <p class="text-white text-base font-medium leading-normal">${member.name || 'Unknown'}</p>
            <p class="text-[#92aec8] text-sm font-normal leading-normal">${member.position || 'No Position'}</p>
            <p class="text-[#92aec8] text-sm font-normal leading-normal">${member.email || 'No Email'}</p>
            ${member.phone ? `<p class="text-[#92aec8] text-sm font-normal leading-normal">${member.phone}</p>` : ''}
          </div>
        `;

        // Add click event to show member details
        memberDiv.addEventListener('click', () => showMemberDetails(member, memberId));
        
        return memberDiv;
      }

      // Function to show member details in a modal
      function showMemberDetails(member, memberId) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-[#111a22] border border-[#243647] rounded-xl max-w-md w-full p-6 relative">
            <button class="absolute top-4 right-4 text-[#92aec8] hover:text-white text-2xl" onclick="this.closest('.fixed').remove()">
              &times;
            </button>
            <div class="text-center">
              <div class="w-32 h-32 mx-auto mb-4 bg-center bg-no-repeat bg-cover rounded-full border-2 border-[#243647]"
                   style="background-image: url('${member.photo || 'https://via.placeholder.com/150x150?text=No+Photo'}');"></div>
              <h3 class="text-white text-xl font-bold mb-2">${member.name || 'Unknown'}</h3>
              <p class="text-[#1473cc] text-lg font-medium mb-4">${member.position || 'No Position'}</p>
              
              <div class="text-left space-y-3">
                ${member.email ? `
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <span class="text-[#92aec8]">${member.email}</span>
                  </div>
                ` : ''}
                
                ${member.phone ? `
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                    <span class="text-[#92aec8]">${member.phone}</span>
                  </div>
                ` : ''}
                
                ${member.experience ? `
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-[#92aec8]">${member.experience} years experience</span>
                  </div>
                ` : ''}
                
                ${member.bio ? `
                  <div class="mt-4">
                    <h4 class="text-white font-medium mb-2">About</h4>
                    <p class="text-[#92aec8] text-sm leading-relaxed">${member.bio}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      }

      // Initialize sample data in Firebase (run this once to populate your database)
      async function initializeSampleData() {
        const sampleTeamMembers = [
          {
            name: "Liam Carter",
            position: "Sales Manager",
            email: "liam.carter@autoemporium.com",
            phone: "(555) 123-0001",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHtqIxUvv_JqZ0FgnZT2AbAl8LUi9XoqCA8DsDYsT33yJ2oGrAy1QDcaNA8hnZLT6vHyhIYCdNmAWCntv3dRWk_xko_zszlHwLtF2aZUxknob71d7oOfcy6UiHkISokFlxMMmoZKtT84sSIez_RJBBzaICSkXYo02cD7mSrW3SSg-bBvfKl5HWWSYcgN2n8QJD2G2p0TdhrjH81fiM1y2KQwK8wIyFzxOyzuxvHu2H-sIyLX-DtJr8antCJVeouzMeYb_esuhQwdaB",
            experience: 8,
            bio: "Liam has been with Auto Emporium for over 8 years, helping customers find their perfect vehicle. His expertise in automotive sales and customer service makes him a valuable asset to our team.",
            order: 1
          },
          {
            name: "Olivia Hayes",
            position: "Service Advisor",
            email: "olivia.hayes@autoemporium.com",
            phone: "(555) 123-0002",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnaM-gcasCMhcDoo0Vg7joycrDdE6MSEC6HMbVM_5QWFAMhHdBwmeoooRzmhzMIOXDXW7q6yYzD1EqCX-EFkPkubShvPsTMBna6J-_Xcpwnst8AEWWlcXbccoGg6Lpcm7MbigufqmMx1G4lXygDZdAv6Pg2Av48W0f7-JkV1sLI9FOnoy8DPs03oF5lcgRjm0L2CMcsrBC4ZpjvowwlzRx8du2Va4GwVW7KvXs4B5Xr2lUyNC7jTH2NqeBIM1Ef5bx3YN0FU9VIUK7",
            experience: 5,
            bio: "Olivia ensures that every customer receives top-notch service for their vehicle. With her attention to detail and technical knowledge, she coordinates all service appointments and keeps customers informed throughout the process.",
            order: 2
          },
          {
            name: "Noah Foster",
            position: "Lead Technician",
            email: "noah.foster@autoemporium.com",
            phone: "(555) 123-0003",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD0Tlk6Im_7ph6XeB4Tgxr-N8KHlC9KJe8_JduQSTryvIPGw4qB6M3X7eBr46akwVpsxrwZf0v4a6xRGo36vbQckTVJN2hvjV7l7srVoAy5rp5OwZHegTpIZzTKUOapODll12jcxDHUoNDMyrbA7Bmi8ixCj7lkWTQPX7P3CM1AOPKyoCPoa3XctET3cn59U_DohgfBe-8KJ8qfal0eltUi5IT1J-fGx7UmyT996w67YnRb4N9K9mAKG3ovsO2KRgZFG7pGR1sGIiD",
            experience: 12,
            bio: "Noah is our most experienced technician with over 12 years in automotive repair. He specializes in both modern and classic vehicles, ensuring every car that comes through our service department receives expert care.",
            order: 3
          }
        ];

        try {
          for (const member of sampleTeamMembers) {
            await db.collection('team').add(member);
          }
          console.log('Sample team data initialized successfully!');
        } catch (error) {
          console.error('Error initializing sample data:', error);
        }
      }

      // Function to load featured vehicles from Firebase
      async function loadFeaturedVehicles() {
        const vehiclesContainer = document.getElementById('vehicles-container');
        const vehiclesWrapper = vehiclesContainer.querySelector('.flex.items-stretch.p-4.gap-3');
        
        try {
          const snapshot = await db.collection('vehicles').where('featured', '==', true).orderBy('order', 'asc').get();
          
          if (snapshot.empty) {
            vehiclesWrapper.innerHTML = `
              <div class="flex items-center justify-center p-8 min-w-60">
                <div class="text-[#92aec8] text-base">No featured vehicles found.</div>
              </div>
            `;
            return;
          }

          vehiclesWrapper.innerHTML = ''; // Clear loading message
          
          snapshot.forEach(doc => {
            const vehicle = doc.data();
            const vehicleElement = createVehicleElement(vehicle, doc.id);
            vehiclesWrapper.appendChild(vehicleElement);
          });
        } catch (error) {
          console.error('Error loading featured vehicles:', error);
          vehiclesWrapper.innerHTML = `
            <div class="flex items-center justify-center p-8 min-w-60">
              <div class="text-red-400 text-base">Error loading vehicles. Please check your Firebase configuration.</div>
            </div>
          `;
        }
      }

      // Function to create vehicle element
      function createVehicleElement(vehicle, vehicleId) {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.className = 'flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group';
        vehicleDiv.setAttribute('data-vehicle-id', vehicleId);
        
        // Generate SEO-friendly structured data for each vehicle
        const vehicleSchema = {
          "@type": "Car",
          "name": vehicle.name,
          "brand": vehicle.make,
          "model": vehicle.model,
          "vehicleModelDate": vehicle.year,
          "mileageFromOdometer": vehicle.mileage,
          "fuelType": vehicle.fuelType,
          "offers": {
            "@type": "Offer",
            "price": vehicle.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        };
        
        vehicleDiv.innerHTML = `
          <script type="application/ld+json">${JSON.stringify(vehicleSchema)}</script>
          <div
            class="vehicle-image w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col border-2 border-transparent group-hover:border-[#1473cc] transition-all duration-300 relative overflow-hidden"
          >
            ${vehicle.featured ? '<div class="absolute top-2 left-2 bg-[#1473cc] text-white text-xs px-2 py-1 rounded font-semibold">FEATURED</div>' : ''}
            <div class="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Click for details
            </div>
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <p class="text-white text-base font-medium leading-normal line-clamp-2">${vehicle.name || 'Unknown Vehicle'}</p>
              <p class="text-[#92aec8] text-sm font-normal leading-normal mt-1 line-clamp-2">${vehicle.description || 'No description available'}</p>
              
              <!-- Vehicle specs - Mobile optimized -->
              <div class="flex flex-wrap gap-2 mt-2 text-xs text-[#92aec8]">
                ${vehicle.year ? `<span class="bg-[#243647] px-2 py-1 rounded">${vehicle.year}</span>` : ''}
                ${vehicle.mileage ? `<span class="bg-[#243647] px-2 py-1 rounded">${vehicle.mileage.toLocaleString()} mi</span>` : ''}
                ${vehicle.fuelType ? `<span class="bg-[#243647] px-2 py-1 rounded">${vehicle.fuelType}</span>` : ''}
              </div>
            </div>
            
            <div class="mt-3 flex items-center justify-between">
              ${vehicle.price ? `<p class="text-[#1473cc] text-lg font-bold leading-normal">$${vehicle.price.toLocaleString()}</p>` : '<p class="text-[#92aec8] text-sm">Price on request</p>'}
              <div class="flex gap-1">
                <button onclick="event.stopPropagation(); showContactModal('${vehicleId}', '${vehicle.name}')" class="bg-[#1473cc] text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors">
                  Contact
                </button>
                <button onclick="event.stopPropagation(); showTestDriveModal('${vehicleId}', '${vehicle.name}')" class="border border-[#243647] text-[#92aec8] text-xs px-2 py-1 rounded hover:border-[#1473cc] hover:text-white transition-colors">
                  Test Drive
                </button>
              </div>
            </div>
          </div>
        `;

        // Set background image using JavaScript to avoid CSS linting issues
        const imageElement = vehicleDiv.querySelector('.vehicle-image');
        if (imageElement) {
          imageElement.style.backgroundImage = `url('${vehicle.image || 'https://via.placeholder.com/300x200?text=No+Image'}')`;
        }

        // Add click event to show vehicle details
        vehicleDiv.addEventListener('click', () => showVehicleDetails(vehicle, vehicleId));
        
        return vehicleDiv;
      }

      // Function to show vehicle details in a modal
      function showVehicleDetails(vehicle, vehicleId) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-[#111a22] border border-[#243647] rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button class="absolute top-4 right-4 text-[#92aec8] hover:text-white text-2xl z-10" onclick="this.closest('.fixed').remove()">
              &times;
            </button>
            <div>
              <div class="vehicle-modal-image w-full h-64 mb-4 bg-center bg-no-repeat bg-cover rounded-xl border-2 border-[#243647]"></div>
              
              <div class="space-y-4">
                <div>
                  <h3 class="text-white text-2xl font-bold mb-2">${vehicle.name || 'Unknown Vehicle'}</h3>
                  ${vehicle.price ? `<p class="text-[#1473cc] text-xl font-bold mb-3">$${vehicle.price.toLocaleString()}</p>` : ''}
                </div>
                
                <div class="grid grid-cols-2 gap-4 text-sm">
                  ${vehicle.year ? `
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-[#92aec8]">Year: <span class="text-white">${vehicle.year}</span></span>
                    </div>
                  ` : ''}
                  
                  ${vehicle.make ? `
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                      </svg>
                      <span class="text-[#92aec8]">Make: <span class="text-white">${vehicle.make}</span></span>
                    </div>
                  ` : ''}
                  
                  ${vehicle.model ? `
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-[#92aec8]">Model: <span class="text-white">${vehicle.model}</span></span>
                    </div>
                  ` : ''}
                  
                  ${vehicle.mileage ? `
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-[#92aec8]">Mileage: <span class="text-white">${vehicle.mileage.toLocaleString()} miles</span></span>
                    </div>
                  ` : ''}
                  
                  ${vehicle.fuelType ? `
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"></path>
                      </svg>
                      <span class="text-[#92aec8]">Fuel: <span class="text-white">${vehicle.fuelType}</span></span>
                    </div>
                  ` : ''}
                  
                  ${vehicle.transmission ? `
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#92aec8]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-[#92aec8]">Transmission: <span class="text-white">${vehicle.transmission}</span></span>
                    </div>
                  ` : ''}
                </div>
                
                ${vehicle.description ? `
                  <div class="mt-4">
                    <h4 class="text-white font-medium mb-2">Description</h4>
                    <p class="text-[#92aec8] text-sm leading-relaxed">${vehicle.description}</p>
                  </div>
                ` : ''}
                
                ${vehicle.features && vehicle.features.length > 0 ? `
                  <div class="mt-4">
                    <h4 class="text-white font-medium mb-2">Features</h4>
                    <div class="flex flex-wrap gap-2">
                      ${vehicle.features.map(feature => `
                        <span class="bg-[#243647] text-[#92aec8] px-2 py-1 rounded text-xs">${feature}</span>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
                
                <div class="flex flex-col sm:flex-row gap-3 mt-6">
                  <button onclick="showContactModal('${vehicleId}', '${vehicle.name}')" class="flex-1 bg-[#1473cc] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    Contact About This Vehicle
                  </button>
                  <button onclick="showTestDriveModal('${vehicleId}', '${vehicle.name}')" class="px-4 py-2 border border-[#243647] text-[#92aec8] rounded-lg hover:border-[#1473cc] hover:text-white transition-colors flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd"></path>
                    </svg>
                    Schedule Test Drive
                  </button>
                </div>
                
                <!-- Quick Actions -->
                <div class="mt-4 pt-4 border-t border-[#243647]">
                  <div class="flex flex-wrap gap-2 text-sm">
                    <a href="tel:+1-555-AUTO-DEAL" class="flex items-center gap-1 text-[#1473cc] hover:text-white transition-colors">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      Call Now
                    </a>
                    <button onclick="shareVehicle('${vehicleId}', '${vehicle.name}')" class="flex items-center gap-1 text-[#92aec8] hover:text-white transition-colors">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                      </svg>
                      Share
                    </button>
                    <button onclick="saveVehicle('${vehicleId}', '${vehicle.name}')" class="flex items-center gap-1 text-[#92aec8] hover:text-white transition-colors">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set background image using JavaScript to avoid CSS linting issues
        const modalImageElement = modal.querySelector('.vehicle-modal-image');
        if (modalImageElement) {
          modalImageElement.style.backgroundImage = `url('${vehicle.image || 'https://via.placeholder.com/600x400?text=No+Image'}')`;
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      }

      // Contact Modal Function
      function showContactModal(vehicleId, vehicleName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-[#111a22] border border-[#243647] rounded-xl max-w-md w-full p-6 relative">
            <button class="absolute top-4 right-4 text-[#92aec8] hover:text-white text-2xl" onclick="this.closest('.fixed').remove()">
              &times;
            </button>
            
            <h3 class="text-white text-xl font-bold mb-4">Contact About: ${vehicleName}</h3>
            
            <form id="contact-form" class="space-y-4">
              <div>
                <label class="block text-white text-sm font-medium mb-2">Your Name *</label>
                <input type="text" required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
              </div>
              
              <div>
                <label class="block text-white text-sm font-medium mb-2">Email *</label>
                <input type="email" required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
              </div>
              
              <div>
                <label class="block text-white text-sm font-medium mb-2">Phone</label>
                <input type="tel" class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
              </div>
              
              <div>
                <label class="block text-white text-sm font-medium mb-2">Message</label>
                <textarea rows="3" placeholder="I'm interested in this vehicle..." class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none"></textarea>
              </div>
              
              <div class="flex gap-3">
                <button type="submit" class="flex-1 bg-[#1473cc] text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Send Message
                </button>
                <button type="button" onclick="this.closest('.fixed').remove()" class="px-4 py-3 border border-[#243647] text-[#92aec8] rounded-lg hover:border-[#1473cc] hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            </form>
            
            <div class="mt-4 pt-4 border-t border-[#243647] text-center">
              <p class="text-[#92aec8] text-sm mb-2">Or contact us directly:</p>
              <div class="flex justify-center gap-4 text-sm">
                <a href="tel:+1-555-AUTO-DEAL" class="text-[#1473cc] hover:text-white transition-colors">📞 (555) AUTO-DEAL</a>
                <a href="mailto:sales@autoemporium.com" class="text-[#1473cc] hover:text-white transition-colors">✉️ sales@autoemporium.com</a>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        modal.querySelector('#contact-form').addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Thank you for your interest! We will contact you shortly.');
          modal.remove();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      }

      // Test Drive Modal Function
      function showTestDriveModal(vehicleId, vehicleName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-[#111a22] border border-[#243647] rounded-xl max-w-md w-full p-6 relative">
            <button class="absolute top-4 right-4 text-[#92aec8] hover:text-white text-2xl" onclick="this.closest('.fixed').remove()">
              &times;
            </button>
            
            <h3 class="text-white text-xl font-bold mb-4">Schedule Test Drive: ${vehicleName}</h3>
            
            <form id="test-drive-form" class="space-y-4">
              <div>
                <label class="block text-white text-sm font-medium mb-2">Your Name *</label>
                <input type="text" required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
              </div>
              
              <div>
                <label class="block text-white text-sm font-medium mb-2">Email *</label>
                <input type="email" required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
              </div>
              
              <div>
                <label class="block text-white text-sm font-medium mb-2">Phone *</label>
                <input type="tel" required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
              </div>
              
              <div>
                <label class="block text-white text-sm font-medium mb-2">Driver's License Number *</label>
                <input type="text" required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-white text-sm font-medium mb-2">Preferred Date *</label>
                  <input type="date" required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
                </div>
                <div>
                  <label class="block text-white text-sm font-medium mb-2">Preferred Time *</label>
                  <select required class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none">
                    <option value="">Select Time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-white text-sm font-medium mb-2">Special Requirements</label>
                <textarea rows="2" placeholder="Any special requirements or questions..." class="w-full p-3 rounded-lg bg-[#243647] text-white border border-[#92aec8] focus:border-[#1473cc] focus:outline-none"></textarea>
              </div>
              
              <div class="flex gap-3">
                <button type="submit" class="flex-1 bg-[#1473cc] text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Schedule Test Drive
                </button>
                <button type="button" onclick="this.closest('.fixed').remove()" class="px-4 py-3 border border-[#243647] text-[#92aec8] rounded-lg hover:border-[#1473cc] hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            </form>
            
            <div class="mt-4 pt-4 border-t border-[#243647]">
              <div class="bg-[#243647] p-3 rounded-lg">
                <p class="text-white text-sm font-medium mb-1">⚠️ Test Drive Requirements:</p>
                <ul class="text-[#92aec8] text-xs space-y-1">
                  <li>• Valid driver's license required</li>
                  <li>• Must be 21+ years old</li>
                  <li>• Proof of insurance recommended</li>
                  <li>• Test drives available during business hours</li>
                </ul>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set minimum date to today
        const dateInput = modal.querySelector('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Handle form submission
        modal.querySelector('#test-drive-form').addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Test drive scheduled! We will contact you to confirm the appointment.');
          modal.remove();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      }

      // Vehicle sharing function
      function shareVehicle(vehicleId, vehicleName) {
        if (navigator.share) {
          navigator.share({
            title: `${vehicleName} - Auto Emporium`,
            text: `Check out this vehicle at Auto Emporium: ${vehicleName}`,
            url: `${window.location.href}#vehicle-${vehicleId}`
          });
        } else {
          const url = `${window.location.href}#vehicle-${vehicleId}`;
          navigator.clipboard.writeText(url).then(() => {
            alert('Vehicle link copied to clipboard!');
          }).catch(() => {
            prompt('Copy this link to share:', url);
          });
        }
      }

      // Save vehicle function (could integrate with localStorage or user account)
      function saveVehicle(vehicleId, vehicleName) {
        let savedVehicles = JSON.parse(localStorage.getItem('savedVehicles') || '[]');
        if (!savedVehicles.includes(vehicleId)) {
          savedVehicles.push(vehicleId);
          localStorage.setItem('savedVehicles', JSON.stringify(savedVehicles));
          alert(`${vehicleName} has been saved to your favorites!`);
        } else {
          alert(`${vehicleName} is already in your favorites.`);
        }
      }

      // Show all vehicles modal for mobile
      function showAllVehiclesModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-[#111a22] border border-[#243647] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div class="p-4 border-b border-[#243647] flex justify-between items-center">
              <h3 class="text-white text-xl font-bold">All Vehicles</h3>
              <button class="text-[#92aec8] hover:text-white text-2xl" onclick="this.closest('.fixed').remove()">
                &times;
              </button>
            </div>
            
            <div class="p-4 max-h-[calc(90vh-80px)] overflow-y-auto" id="all-vehicles-grid">
              <div class="text-[#92aec8] text-center py-8">Loading all vehicles...</div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Load all vehicles (not just featured)
        loadAllVehiclesForModal();
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      }

      // Load all vehicles for the modal
      async function loadAllVehiclesForModal() {
        try {
          const snapshot = await db.collection('vehicles').where('available', '!=', false).orderBy('order', 'asc').get();
          const gridContainer = document.getElementById('all-vehicles-grid');
          
          if (snapshot.empty) {
            gridContainer.innerHTML = '<div class="text-[#92aec8] text-center py-8">No vehicles available.</div>';
            return;
          }

          gridContainer.innerHTML = '';
          gridContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4';
          
          snapshot.forEach(doc => {
            const vehicle = doc.data();
            const vehicleElement = createCompactVehicleElement(vehicle, doc.id);
            gridContainer.appendChild(vehicleElement);
          });
        } catch (error) {
          console.error('Error loading all vehicles:', error);
          document.getElementById('all-vehicles-grid').innerHTML = '<div class="text-red-400 text-center py-8">Error loading vehicles.</div>';
        }
      }

      // Create compact vehicle element for modal
      function createCompactVehicleElement(vehicle, vehicleId) {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.className = 'bg-[#243647] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow';
        
        vehicleDiv.innerHTML = `
          <div class="compact-vehicle-image h-48 bg-center bg-cover"></div>
          <div class="p-4">
            <h4 class="text-white font-medium text-sm line-clamp-2 mb-1">${vehicle.name}</h4>
            <p class="text-[#92aec8] text-xs mb-2">${vehicle.year} ${vehicle.make} ${vehicle.model}</p>
            <p class="text-[#1473cc] font-bold text-sm">${vehicle.price ? '$' + vehicle.price.toLocaleString() : 'Price on request'}</p>
            
            <div class="flex gap-1 mt-3">
              <button onclick="event.stopPropagation(); showContactModal('${vehicleId}', '${vehicle.name}'); document.querySelector('.fixed').remove();" class="flex-1 bg-[#1473cc] text-white text-xs px-2 py-2 rounded hover:bg-blue-600 transition-colors">
                Contact
              </button>
              <button onclick="event.stopPropagation(); showTestDriveModal('${vehicleId}', '${vehicle.name}'); document.querySelector('.fixed').remove();" class="flex-1 border border-[#92aec8] text-[#92aec8] text-xs px-2 py-2 rounded hover:border-[#1473cc] hover:text-white transition-colors">
                Test Drive
              </button>
            </div>
          </div>
        `;

        // Set background image using JavaScript to avoid CSS linting issues
        const compactImageElement = vehicleDiv.querySelector('.compact-vehicle-image');
        if (compactImageElement) {
          compactImageElement.style.backgroundImage = `url('${vehicle.image || 'https://via.placeholder.com/300x200?text=No+Image'}')`;
        }

        // Add click event to show vehicle details
        vehicleDiv.addEventListener('click', () => {
          // Close the all vehicles modal first
          document.querySelector('.fixed').remove();
          // Then show vehicle details
          showVehicleDetails(vehicle, vehicleId);
        });
        
        return vehicleDiv;
      }

      // Initialize sample vehicle data in Firebase
      async function initializeSampleVehicleData() {
        const sampleVehicles = [
          {
            name: "2023 Luxury Sedan",
            make: "Mercedes-Benz",
            model: "C-Class",
            year: 2023,
            price: 45000,
            mileage: 12000,
            fuelType: "Gasoline",
            transmission: "Automatic",
            description: "Sleek design and advanced technology with premium interior",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUSF4WLrfQ-a6MYutTzhj7XjnwALdyx8dcesyMi6-LQDqKcH6jslSjgzJLyXWJj3sjUY3GSveJdEX81zvposWKtjsAdV4NH8Zsfy4fdQZrYmgQxkjjZJk_DhsHYM6YwtGW_SOCBicmAVGfidJZ2eG69IJTXKS77PHSTesQeI7f9BtdU_0L1RVVRa3Nfz5nd5vlhb2KX9whZq24WK8JSkF13BXzDwnb1ZkSnz1E4cBr-mUh_Rmh0psY3arMxbE6rWo22_YUTyuRhJsS",
            features: ["Leather Seats", "Navigation System", "Sunroof", "Backup Camera"],
            featured: true,
            order: 1
          },
          {
            name: "2022 Sports Coupe",
            make: "BMW",
            model: "M4",
            year: 2022,
            price: 65000,
            mileage: 8500,
            fuelType: "Gasoline",
            transmission: "Manual",
            description: "High performance and stylish appearance with racing-inspired design",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7vfix40qg1ZRF07iIvzNJQe8G5SlILqmJQILl7QK7clh3aZt94oCULDI8qmYNHZ2G0svMx4p-StKd57BQ45fIXHqqNirqA6IVdP1BFzXbYbYW8VNv3RwQmuXsuZ1qPLjvZKAfz-zzN-SYLZx6Wg54SRuydBdSJDXegHfnJ3cfh0MmiiHYvi5RR7C72RcpaAas2GUWCGSZzVOO2DVSXjhFuTfgOGOIxQMyuKwKwx4x_E7sPTrHNImlwBylqGbxek8m0OPb5wAoBKlm",
            features: ["Sport Package", "Carbon Fiber Trim", "Performance Brakes", "Track Mode"],
            featured: true,
            order: 2
          },
          {
            name: "2023 Family SUV",
            make: "Toyota",
            model: "Highlander",
            year: 2023,
            price: 38000,
            mileage: 15000,
            fuelType: "Hybrid",
            transmission: "CVT",
            description: "Spacious interior and powerful engine perfect for families",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpBdUZ4By3W1XzOXtdLQY_jvTHxJ_7zx8N16jAy8qYkNBI90W0XONYmFDx27emfRfdjAoGXUsi3eBr2B5lK8EJPKy3WHeWxf8UgUtsBl_7mbx7m9kDnWUD19AdYlBuceYLpCRcPriJri1Qg3LJiQOHoa8Mqtze9lrDRZyaEV0D199H5ibunEA0ni11nBOOYJ-hx_ufNEYRn_Ke4vkICs3vsozaWZGqx-mOzHs8zTVmfIlTFVewYRnU1lDZGAxdTy7av_uIgV9Mvcn5",
            features: ["3rd Row Seating", "All-Wheel Drive", "Safety Sense 2.0", "Wireless Charging"],
            featured: true,
            order: 3
          },
          {
            name: "2024 Electric Vehicle",
            make: "Tesla",
            model: "Model 3",
            year: 2024,
            price: 52000,
            mileage: 5000,
            fuelType: "Electric",
            transmission: "Single Speed",
            description: "Eco-friendly and innovative features with cutting-edge technology",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIaUmyYCiUBxpzwrQdNHmMvbMAkjnZCPX3mMz82NO1j2YtAorY16LWSrYxfvnblm-sWBqsM4lEWVGd5cT6NJweh_PvrDi6_04QakULCqRUKDviuGxdacmHlmaT7vwmp-M7FrsnFH1IO-IM54ogsof89IeIXFdqOl6syDbx66vcAgtzUMMlkhRQWViRngVupJExa0fO1s99T_HH3ZBucaIurjSSfWTT8aOWP6L9MDl6iy4JaQm30DCNs8ZfRI14MFD2C06kfPy-3rS6",
            features: ["Autopilot", "Supercharging", "Premium Audio", "Glass Roof"],
            featured: true,
            order: 4
          }
        ];

        try {
          for (const vehicle of sampleVehicles) {
            await db.collection('vehicles').add(vehicle);
          }
          console.log('Sample vehicle data initialized successfully!');
        } catch (error) {
          console.error('Error initializing sample vehicle data:', error);
        }
      }

      // Load content when the page loads
      document.addEventListener('DOMContentLoaded', () => {
        loadTeamMembers();
        loadFeaturedVehicles();
      });

      // Uncomment the lines below to initialize sample data (run once)
      // initializeSampleData();
      // initializeSampleVehicleData();
