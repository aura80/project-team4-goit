document.addEventListener("DOMContentLoaded",(function(){var e="https://app.ticketmaster.com/discovery/v2/events.json?apikey=".concat("ABgCFeGHE7lHgwV23hsJAFL80GX9ypoh"),n=document.getElementById("myModal"),t=document.getElementsByClassName("close")[0],o=document.getElementById("eventContainer"),d=document.getElementById("modalEventName");o.addEventListener("click",(function(e){var t=e.target.closest(".event-card");t&&(n.style.display="block",d.textContent=t.dataset.name)})),t.onclick=function(){n.style.display="none"},window.onclick=function(e){e.target==n&&(n.style.display="none")},fetch(e).then((function(e){return e.json()})).then((function(e){console.log("Events fetched:",e),e._embedded&&e._embedded.events?function(e){o.innerHTML="",e.forEach((function(e){var n=document.createElement("div");n.classList.add("event-card"),n.dataset.name=e.name,n.dataset.url=e.url,n.dataset.standardUrl=e.url+"?pricing=standard",console.log("Standard URL generated for event:",n.dataset.standardUrl);var t=document.createElement("h3");t.textContent=e.name,n.appendChild(t);var d=document.createElement("p");d.textContent=new Date(e.dates.start.dateTime).toLocaleDateString(),n.appendChild(d);var a=document.createElement("p");a.textContent="".concat(e._embedded.venues[0].name,", ").concat(e._embedded.venues[0].city.name),n.appendChild(a),o.appendChild(n),console.log("Event card created for event:",e.name)}))}(e._embedded.events):(console.error("No events found in the response"),o.innerHTML="<p>No events found.</p>")})).catch((function(e){console.error("Error fetching events:",e),o.innerHTML="<p>Error fetching events. Please try again later.</p>"}))})),document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("buyTicketButton"),n=document.getElementById("buyStandardTicketButton"),t="",o="";e.onclick=function(){console.log("Opening URL:",t),t?window.open(t,"_blank"):console.error("No URL set for the current event")},n.onclick=function(){console.log("Opening Standard URL:",o),o?window.open(o,"_blank"):console.error("No Standard URL set for the current event")},window.addEventListener("click",(function(e){var n=e.target.closest(".event-card");n&&(t=n.dataset.url,o=n.dataset.standardUrl,console.log("**URL set for current event:",t),console.log("**Standard URL set for current event:",o))}))})),document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("buyTicketButton"),n=document.getElementById("buyStandardTicketButton"),t="",o="";e.onclick=function(){console.log("Opening URL:",t),t?window.open(t,"_blank"):console.error("No URL set for the current event")},n.onclick=function(){console.log("Opening Standard URL:",o),o?window.open(o,"_blank"):console.error("No Standard URL set for the current event")},window.addEventListener("click",(function(e){var n=e.target.closest(".event-card");n&&(t=n.dataset.url,o=n.dataset.standardUrl,console.log("**URL set for current event:",t),console.log("**Standard URL set for current event:",o))}))}));
//# sourceMappingURL=index.ae1ef48e.js.map
