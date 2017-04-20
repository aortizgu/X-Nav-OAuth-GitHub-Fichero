
var repoHTML = "<input type='text' name='user' value='jgbarah' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' value='GitHub-API' " +
    "id='repo' size='10' />" +
    "<button type='button'>Grab repo data</button>" +
"<div id='repodata'/>";

$('document').ready( function(){
    console.log("ready");

$('#tokenCall').click(function(){

    var token = $("#token").val();
    console.log (token);

    gh = new Github({
    token: token,
    });

    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
    me.listNotifications(function(err, notifications) {
console.log(notifications)    });

    var clayreimann = gh.getUser('clayreimann');
    clayreimann.listStarredRepos(function(err, repos) {
       // look at all the starred repos!
    });

});

});



function getToken() {
    var token = $("#token").val();
    console.log (token);

    github = new Github({
	token: token,
	auth: "oauth"
    });

    $("#repoform").html(repoHTML)
    $("div#form button").click(getRepo);
};

function getRepo() {
    var user = $("#user").val();
    var reponame = $("#repo").val();
    var repo = github.getRepo(user, reponame);
    repo.show(showRepo);
};

function showRepo(error, repo) {
    var repodata = $("#repodata");
    if (error) {
	repodata.html("<p>Error code: " + error.error + "</p>");
    } else {
	repodata.html("<p>Repo data:</p>" +
		      "<ul><li>Full name: " + repo.full_name + "</li>" +
		      "<li>Description: " + repo.description + "</li>" +
		      "<li>Created at: " + repo.created_at + "</li>" +
		      "</ul>")
	console.log (repo);
	console.log (repo.full_name, repo.description, repo.created_at);
    }
};
