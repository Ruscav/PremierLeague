async function fetchData() {
	const url = 'https://livescore-sports.p.rapidapi.com/v1/competitions/standings?timezone=0&competition_id=65&locale=EN';
	const options = {
	  method: 'GET',
	  headers: {
      'X-RapidAPI-Key': 'd97b0d217dmsh4dde714b53f5fbep107c9djsn111363212f9b',
      'X-RapidAPI-Host': 'livescore-sports.p.rapidapi.com'
	  }
	};
	
	try {
	  const response = await fetch(url, options);
	  const result = await response.text();
	  
	  const jsonData = JSON.parse(result);
  // console.dir(jsonData);
  
  const teams = jsonData.DATA[0].LEAGUE_TABLE.L[0].TABLES[0].TEAM;
  console.log(teams)
  
  const leaguetable = document.getElementById('leaguetable');
  leaguetable.innerHTML = ''; // clear previous content
  
  teams.forEach((team, index) => {
    const tr = document.createElement('tr');

    // Check if the index is less than 4 (0-based index)
    const isGreenBackground = index < 4;

    // Create a class string based on the condition
    const Greenbackground = isGreenBackground ? 'green-background' : '';

    const isOrangeBackground = index >= 4 && index < 5;

    const Orangebackground = isOrangeBackground ? 'orange-background' : '';

    const isBrownbackground = index >=17 && index < 20 ;

    const Brownbackground = isBrownbackground ? 'brown-background' : '';

    tr.innerHTML = `
        <td class="${Greenbackground} ${Orangebackground} ${Brownbackground}">${team.RANK}</td>
   

    <td class="favorite-toggle-container">
    <img src="${team.BADGE_SOURCE}" alt="Team Badge"/>
    ${team.TEAM_NAME}
    <label class="favorite-toggle-label">
      <input type="radio" name="favoriteToggle" value="on" onclick="setFavoriteStatus('${team.TEAM_NAME}', true)">
      Add Favie
    </label>
    <label class="favorite-toggle-label">
      <input type="radio" name="favoriteToggle" value="off" onclick="setFavoriteStatus('${team.TEAM_NAME}', false)">
      Out Favie
    </label>
  </td>

  <td>${team.TEAM_PLAYED}</td>
  <td>${team.WINS_INT}</td>
  <td>${team.DRAWS_INT}</td>
  <td>${team.LOSES_INT}</td>
  <td>${team.GOAL_DIFFERENCE}</td>
  <td>${team.POINTS_INT}</td>`;

    // Append the created row to your table
    // Replace 'yourTableId' with the actual ID of your table
    document.getElementById('league').appendChild(tr);
});
  
       
  } catch (error) {
    console.log(error);
  }
}

fetchData(); 

function updateClock() {
  const now = new Date();
  const dateElement = document.getElementById('date');

  
  const date = now.toDateString();
  

  // Update HTML content
  dateElement.textContent = date;
 
}


updateClock();
// setInterval(updateClock, 1000); 


function setFavoriteStatus(teamName, isFavorite) {
  // Retrieve existing favorite teams from Local Storage
  var favoriteTeams = JSON.parse(localStorage.getItem("favoriteTeams")) || [];

  // Check if the team is already in favorites
  var index = favoriteTeams.indexOf(teamName);

  if (isFavorite) {
    // If the radio button is set to "On" and the team is not in favorites, add it
    if (index === -1) {
      favoriteTeams.push(teamName);
      alert(teamName + " added to favorites!");
    } else {
      // If the team is already in favorites, do nothing
      alert(teamName + " is already in favorites!");
    }
  } else {
    // If the radio button is set to "Off" and the team is in favorites, remove it
    if (index !== -1) {
      favoriteTeams.splice(index, 1);
      alert(teamName + " removed from favorites!");
    } else {
      // If the team is not in favorites, do nothing
      alert(teamName + " is not in favorites!");
    }
  }

  // Save the updated list of favorite teams to Local Storage
  localStorage.setItem("favoriteTeams", JSON.stringify(favoriteTeams));
}