function printPage() {
    window.print();
  }
      function darkMode() {
            let element = document.body;
            let content = document.getElementById("radar");
            content.style.backgroundColor = "#B7B7B7";
            content.style.color = "white";
            element.className = "dark-mode"
        }
        function lightMode() {
            let element = document.body;
            let content = document.getElementById("radar");
            content.style.backgroundColor = "white";
            element.className = "light-mode";
        }

      var entries = [];
      window.onload = function () {
        var storedEntries = localStorage.getItem("radarEntries");
        if (storedEntries) {
          entries = JSON.parse(storedEntries);
        } else {
          // Set default data
          var defaultEntry = {
            quadrant: 0,
            ring: 0,
            label: "Java",
            active: true,
            moved: 0,
          }
          
        entries.push(defaultEntry);     
          saveEntriesToLocalStorage();
        }
        renderRadar();
      };
      document
        .getElementById("myForm")
        .addEventListener("submit", function (e) {
          e.preventDefault(); // Prevent form submission

          // Get form values
          var quadrant = document.getElementById("quadrant").value;
          var ring = document.getElementById("ring").value;
          var label = document.getElementById("label").value;
          // var active = document.getElementById("active").value;
          // var moved = document.getElementById("moved").value;
          var active = true;
          var moved = 0;
          // Create an array to store the data
          console.log(
            "quadrant, ring, label, active, moved",
            quadrant,
            ring,
            label,
            active,
            moved
          );
          active = active === "true";
          entries.push({
            quadrant: parseInt(quadrant),
            ring: parseInt(ring),
            label: label,
            active: active,
            moved: parseInt(moved),
          });
          saveEntriesToLocalStorage();
          renderRadar();
          // Reset the form
          document.getElementById("myForm").reset();
          // Close the modal dialog
          var modal = document.getElementById("exampleModal");
          var bootstrapModal = bootstrap.Modal.getInstance(modal);
          bootstrapModal.hide();
        });

      function reset() {
        var result = window.confirm("Are you sure you want to proceed?");

        if (result) {
        localStorage.removeItem("radarEntries");
        entries = []; // Clear the entries array
            renderRadar();
        } else {
          renderRadar();
          } 
      }

function resetToDefault(){
        // var entries = [];
     reset();
     var defaultEntries = [
    {
      quadrant: 0,
      ring: 0,
      label: "JavaScript",
      active: true,
      moved: 0,
    },
    {
      quadrant: 1,
      ring: 0,
      label: "Python",
      active: true,
      moved: 0,
    },
];

  // Loop through each object in defaultEntries and push it to the entries array
  for (var i = 0; i < defaultEntries.length; i++) {
    entries.push(defaultEntries[i]);
  }
  saveEntriesToLocalStorage();
  renderRadar();
}
      
function removeLastEntry() {
  entries.pop(); // Remove the last entry from the array
  saveEntriesToLocalStorage();
  renderRadar();
}

// Rest of your code...

// renderRadar(); // Initial rendering


function renderRadar() {
        var radarContainer = document.getElementById("radar");
        radarContainer.innerHTML = ""; // Clear previous graph
        radar_visualization({
          svg_id: "radar",
          width: 1450,
          height: 1000,
          colors: {
            background: "#fff",
            grid: "#dddde0",
            inactive: "#ddd",
          },
          title: "Zalando Tech Radar",
          date: "2023.02",
          quadrants: [
            { name: "Languages" },
            { name: "Infrastructure" },
            { name: "Datastores" },
            { name: "Data Management" },
          ],
          rings: [
            { name: "ADOPT", color: "#5ba300" },
            { name: "TRIAL", color: "#009eb0" },
            { name: "ASSESS", color: "#c7ba00" },
            { name: "HOLD", color: "#e09b96" },
          ],
          print_layout: true,
          links_in_new_tabs: true,
          entries: entries,
        });
      }

      function saveEntriesToLocalStorage() {
        localStorage.setItem("radarEntries", JSON.stringify(entries));
      }

      renderRadar();
 