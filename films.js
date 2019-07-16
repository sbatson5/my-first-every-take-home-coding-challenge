var films=[
	{
		Title: "2001 A Space Odyssey",
		Rating:9.5,
		Genre:"Science Fiction"
	},
	{
		Title:"The Last House on the Left",
		Rating:4.1,
		Genre:"Horror"
	},
	{
		Title:"Shrek",
		Rating:8.8,
		Genre:"Family"
	},
	{
		Title:"2012",
		Rating:3.9,
		Genre:"Drama"
	},
	{
		Title:"Up",
		Rating:9.8,
		Genre:"Family"
	},
	{
		Title:"Interstellar",
		Rating:7.3,
		Genre:"Science Fiction"
	},
	{
		Title:"Shrek 2",
		Rating:8.8,
		Genre:"Family"
	}
];


function newSorter(property) 
{
	//positive integer allows us to go from top to bottom
	var sortOrder = 1;
	//we can add a '-' to invert our sorting
	if(property[0] === "-") 
	{
		//invert it if we want to from bottom to top
		sortOrder = -1;
		//remove first character for when we actually access our object
		property = property.substr(1);
    }
    return function (a,b) 
	{
		//ternary operators!
		//so, we compare each item in our JSON array to each other, apply a 1 if the first is higher
		//a -1 if it is lower and 0 if they are the same
		//that way we will be able to sort using object.sort() since we have compared every item
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

//start by sorting by rating
films.sort(newSorter("-Rating"));


function createTable(filmList)
{
	//reset the innerHTML of our table
	document.getElementById("filmTable").innerHTML = "";
	//create the HTML placeholder to store the contents of the table
	var htmlPlaceHolder = "<tr class='tableHeader'>"
        					+ "<th id='titleSort'>Title</th>"
            				+ "<th id='ratingSort'>Rating</th>"
            				+ "<th id='genreSort'>Genre</th>"
        				   "</tr>";
	for(i=0; i < filmList.length; i++)
	{
		htmlPlaceHolder += "<tr>";
		htmlPlaceHolder += "<td>" + filmList[i].Title + "</td>"
						 + "<td>" + filmList[i].Rating + "</td>"
						 + "<td>" + filmList[i].Genre + "</td></tr>";
	}
	document.getElementById("filmTable").innerHTML += htmlPlaceHolder;
	
	//we have to add our click events here since we recreate them with each function call
	document.getElementById("titleSort").onclick = function() {sorter("Title")};
	document.getElementById("ratingSort").onclick = function() {sorter("Rating")};
	document.getElementById("genreSort").onclick = function() {sorter("Genre")};
	
	//for aesthetics -- add a down arrow if we are sorting from top to bottom
	if(!currentSort.search("-"))
	{
		var lowerSort = currentSort.substr(1).toLowerCase();
		document.getElementById(lowerSort+"Sort").innerHTML += "<span class='arrow'>&uarr;</span>";
	}
	else
	{
		var lowerSort = currentSort.toLowerCase();
		document.getElementById(lowerSort+"Sort").innerHTML += "<span class='arrow'>&darr;</span>";
	}
}

//once the DOM has loaded
window.onload = function()
{
	createTable(films);
	
}
//we need to globally know how we are sorting
var currentSort;
//how we call our sorting functions
function sorter(sortItem)
{
	//check to see if we are currently sorting by this item
	//if we are, append the '-' sign so that we can invert the sort in newSorter()
	sortItem = (currentSort == sortItem) ? "-"+sortItem : sortItem;
	
	//then make sure our currentSort equals the sort item for the next time we sort
	currentSort = sortItem;
	films.sort(newSorter(sortItem));
	createTable(films);
}