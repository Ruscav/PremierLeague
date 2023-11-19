// script.js

// Define the fetchData function for league standings
async function fetchLeagueStandings() {
  const url = 'https://livescore-sports.p.rapidapi.com/v1/competitions/standings?timezone=0&competition_id=65&locale=EN';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '10e8b3ce4cmsha17d5dd26508decp16cb62jsn570245539a1d',
      'X-RapidAPI-Host': 'livescore-sports.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();

    const jsonData = JSON.parse(result);
    console.dir(jsonData);

    const teams = jsonData.DATA[0].LEAGUE_TABLE.L[0].TABLES[0].TEAM;
    console.log(teams);

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

      const isBrownbackground = index >= 17 && index < 20;

      const Brownbackground = isBrownbackground ? 'brown-background' : '';

      tr.innerHTML = `
        <td class="${Greenbackground} ${Orangebackground} ${Brownbackground}">${team.RANK}</td>
        <td><img src="${team.BADGE_SOURCE}" alt="Team Badge"/>
          ${team.TEAM_NAME}</td>
        <td>${team.TEAM_PLAYED}</td>
        <td>${team.WINS_INT}</td>
        <td>${team.DRAWS_INT}</td>
        <td>${team.LOSES_INT}</td>
        <td>${team.GOAL_DIFFERENCE}</td>
        <td>${team.POINTS_INT}</td>
      `;

      // Append the created row to your table
      // Replace 'yourTableId' with the actual ID of your table
      leaguetable.appendChild(tr);
    });

    for (let i = 0; i < teams.length; i++) {
      console.log(teams[i].RANK);
      console.log(teams[i].TEAM_NAME);
      console.log(teams[i].TEAM_PLAYED);
      console.log(teams[i].WINS_INT);
      console.log(teams[i].DRAWS_INT);
      console.log(teams[i].LOSES_INT);
      console.log(teams[i].GOAL_DIFFERENCE);
      console.log(teams[i].POINTS_INT);
    }
  } catch (error) {
    console.error(error);
  }
}

// Define the fetchData function for player statistics
async function fetchPlayerData() {
  
  const url = 'https://livescore-sports.p.rapidapi.com/v1/competitions/player-statistics?stat_type=main&competition_id=65&locale=EN';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '10e8b3ce4cmsha17d5dd26508decp16cb62jsn570245539a1d',
      'X-RapidAPI-Host': 'livescore-sports.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();

    const jsonData = JSON.parse(result);
    console.dir(jsonData);

    const tableBody = document.getElementById('playerTableBody');

    // Check if DATA and STATISTICS properties exist
    if (jsonData.DATA && jsonData.DATA.STATISTICS && jsonData.DATA.STATISTICS[0] && jsonData.DATA.STATISTICS[0].PLAYERS_LIST) {
      const playersList = jsonData.DATA.STATISTICS[0].PLAYERS_LIST;

      playersList.forEach(player => {
        const row = tableBody.insertRow();
        row.innerHTML = `
          <td>${player.PLAYER_RANK}</td>
          <td>${player.PLAYER_NAME}</td>
          <td><img src="${player.BADGE_SOURCE}" alt="Badge"> ${player.TEAM_NAME}</td>
          <td>${Object.values(player.PLAYER_POINTS_LIST)[0]}</td>
        `;
      });
    } else {
      const errorRow = tableBody.insertRow();
      errorRow.innerHTML = '<td colspan="5" style="text-align: center; color: red;">Invalid JSON structure. Missing DATA, STATISTICS, or PLAYERS_LIST properties.</td>';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call both functions when the document is ready
document.addEventListener('DOMContentLoaded', function () {
  fetchLeagueStandings();
  fetchPlayerData();
});