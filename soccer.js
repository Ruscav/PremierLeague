async function fetchData() {
	const url = 'https://livescore-sports.p.rapidapi.com/v1/competitions/standings?timezone=0&competition_id=65&locale=EN';
	const options = {
	  method: 'GET',
	  headers: {
      'X-RapidAPI-Key': '3acb329c4dmsh1dac752a33ccde5p16ef1ajsn8270ec36517a',
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
        <td><img src="${team.BADGE_SOURCE}" alt="Team Badge"/>
            ${team.TEAM_NAME}</td>
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