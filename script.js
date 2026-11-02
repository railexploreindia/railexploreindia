const activities=[
{name:"Delhi – Mumbai Rajdhani",type:"Passenger",route:"Indian Railways",duration:"2h 15m",difficulty:"Medium",size:"46 MB",icon:"🚆"},
{name:"Konkan Railway Freight",type:"Freight",route:"Konkan Railway",duration:"1h 50m",difficulty:"Medium",size:"38 MB",icon:"🚛"},
{name:"Chennai – Bengaluru Express",type:"Passenger",route:"Southern Railway",duration:"1h 40m",difficulty:"Easy",size:"42 MB",icon:"🚉"},
{name:"Shunting in Bhopal Yard",type:"Shunting",route:"Central Railway",duration:"45 min",difficulty:"Easy",size:"24 MB",icon:"🚂"},
{name:"Darjeeling Himalayan Excursion",type:"Special",route:"Mountain Railway",duration:"1h 20m",difficulty:"Medium",size:"31 MB",icon:"♨"},
{name:"Mumbai Suburban Timetable",type:"Timetable",route:"Central Railway",duration:"3h 00m",difficulty:"Hard",size:"52 MB",icon:"▣"},
{name:"Howrah – Delhi Mail",type:"Passenger",route:"Eastern / Northern",duration:"2h 35m",difficulty:"Hard",size:"48 MB",icon:"🚆"},
{name:"Jaipur Goods Yard",type:"Freight",route:"North Western Railway",duration:"1h 10m",difficulty:"Easy",size:"29 MB",icon:"🚛"}
];
function card(a){return `<article class="card"><div class="card-img">${a.icon}</div><div class="card-body"><h3>${a.name}<br><small>(OR Activity)</small></h3><div class="meta">📍 ${a.route}<br>◷ Duration: ~${a.duration}<br>▥ Difficulty: ${a.difficulty}</div><button class="download" onclick="downloadActivity('${a.name}')">⬇ Download (${a.size})</button></div></article>`}
function render(list,target){document.getElementById(target).innerHTML=list.map(card).join("");}
function filterActivities(){
 const q=((document.getElementById("heroSearch")?.value||"")+" "+(document.getElementById("navSearch")?.value||"")).toLowerCase();
 const cat=document.getElementById("categoryFilter")?.value||"";
 const dif=document.getElementById("difficultyFilter")?.value||"";
 const list=activities.filter(a=>(!q||[a.name,a.type,a.route].join(" ").toLowerCase().includes(q))&&(!cat||a.type===cat)&&(!dif||a.difficulty===dif));
 render(list,"allCards"); document.getElementById("resultCount").textContent=`${list.length} activities`;
}
function setCategory(cat){document.getElementById("categoryFilter").value=cat==="Route"?"":cat;document.getElementById("activities").scrollIntoView({behavior:"smooth"});filterActivities();}
function downloadActivity(name){openModal(`<h2>Download: ${name}</h2><p>This demo site is ready for real download links. Connect your ZIP/activity files to this button when deploying.</p><button class="yellow" onclick="closeModal()">Close</button>`)}
function uploadActivity(){openModal("<h2>Upload an Activity</h2><p>Creator uploads can be connected to your preferred storage/database. The front-end is ready for an upload workflow.</p><button class='yellow' onclick='closeModal()'>Close</button>")}
function showGuide(){openModal("<h2>Open Rails Activity Installation</h2><ol><li>Download the activity package.</li><li>Extract it according to the package instructions.</li><li>Install any required route, consist, locomotive and environment files.</li><li>Open the route in Open Rails and select the activity.</li></ol><p><b>Tip:</b> Always read the activity's included README and requirements.</p>")}
function community(){openModal("<h2>RailExploreIndia Community</h2><p>Connect this button to your forum, Discord, or community page when you're ready.</p>")}
function openModal(x){document.getElementById("modalBody").innerHTML=x;document.getElementById("modal").style.display="flex"}
function closeModal(){document.getElementById("modal").style.display="none"}
render(activities.slice(0,4),"cards"); filterActivities();