/*
 * simpleGitHub
 * 
 * Developed by James Fleeting <http://jamesfleeting.com>
 * Another project from monkeeCreate <http://monkeecreate.com>
 *
 * Version 1.0 - Last updated: January 26 2012
 */

(function($) {
	"use strict";
	$.extend({
		simpleGithub: function(options){
			var options = $.extend({
				name: 'jamesfleeting', //user or org name
				type: 'user', //Options: user or org (what type is `name`)
				method: 'repos', //Options: info, repos, orgs (user only)
				success: function(response){},
				error: function(message){}
			}, options);
			var githubAPI = 'https://api.github.com/';
			
			if(options.name === '') {
				options.error('No name was given to retrieve info from GitHub.');
				return false;
			} else if(options.type === '') {
				options.error('No type was given to retrieve info from GitHub.');
				return false;
			} else if(options.method === '') {
				options.error('No method was given to retrieve info from GitHub.');
				return false;
			}
			
			if(options.type === 'user' && options.method === 'repos') {
				var githubUrl = githubAPI+'users/'+options.name+'/repos?callback=?';
			} else if(options.type === 'user' && options.method === 'info') {
				var githubUrl = githubAPI+'users/'+options.name+'?callback=?';
			} else if(options.type === 'user' && options.method === 'orgs') {
				var githubUrl = githubAPI+'users/'+options.name+'/orgs?callback=?';
			} else if(options.type === 'org' && options.method === 'repos') {
				var githubUrl = githubAPI+'orgs/'+options.name+'/repos?callback=?';
			} else if(options.type === 'org' && options.method === 'info') {
				var githubUrl = githubAPI+'orgs/'+options.name+'?callback=?';
			} else {
				options.error('Unable to retrieve data from GitHub. Verify the plugin options are correct.')
				return false;
			}
									
			$.getJSON(
				githubUrl,
				function(obj) {
					if(obj != null) {
						var results = [];
						if(options.type === 'user' && options.method === 'repos') {
							if(obj.data.message === 'Not Found') {
								options.error('Invalid GitHub username. Could not retrieve data.');
								return false;
							}
							
							$(obj.data).each(function() {
								var result = {
									id: this.id,
									name: this.name,
									url: this.url,
									description: this.description,
									homepage: this.homepage,
									clone_url: this.clone_url,
									created_at: this.created_at,
									updated_at: this.updated_at,
									fork: this.fork,
									forks: this.forks,
									watchers: this.watchers,
									has_downloads: this.has_downloads,
									has_issues: this.has_issues,
									has_wiki: this.has_wiki,
									open_issues: this.open_issues,
									html_url: this.html_url,
									language: this.language,
									master_branch: this.master_branch,
									private: this.private,
									pushed_at: this.pushed_at,
									size: this.size,
									git_url: this.git_url,
									ssh_url: this.ssh_url,
									svn_url: this.svn_url,
									mirror_url: this.mirror_url
								};
								
								results[results.length] = result;
							});
						} else if(options.type === 'user' && options.method === 'info') {
							if(obj.data.id === undefined) {
								options.error('Invalid GitHub username. Could not retrieve data.');
								return false;
							}
							var results = {
								id: obj.data.id,
								login: obj.data.login,
								name: obj.data.name,
								location: obj.data.location,
								avatar_url: obj.data.avatar_url,
								bio: obj.data.bio,
								blog: obj.data.blog,
								company: obj.data.company,
								email: obj.data.email,
								followers: obj.data.followers,
								following: obj.data.following,
								gravatar_id: obj.data.gravatar_id,
								hireable: obj.data.hireable,
								html_url: obj.data.html_url,
								public_gists: obj.data.public_gists,
								public_repos: obj.data.public_repos,
								type: obj.data.type,
								url: obj.data.url,
								created_at: obj.data.created_at
							};
						}
						
						options.success(results);
					} else {
						options.error("Your GitHub info could not be received. Try again.");
					}
				}
			);
			return this;
		}		
	});
})(jQuery);