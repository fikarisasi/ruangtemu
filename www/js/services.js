angular.module('starter.services', [])

.value('PARSE_CREDENTIALS',{
	APP_ID: 'xhTpJiNedJ7mmDj3LTTBUePqSVegcJHzEbh70Y0Q',
	REST_API_KEY:'XCfQDPODgNB1HqmaCQgKLPWGxQ0lCUxqffzzURJY'
})

.value('BACKEND',{
	// Fill backend url here
	URL: 'http://ibmers.mybluemix.net/api/'
})

.service('LoginService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		loginUser: function(username,password){
			var deferred = $q.defer();
			var promise = deferred.promise;
			var data = "username="+username+"&password="+password;
			console.log(data);
			$http.post(BACKEND.URL+'/Employees/login',data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				if(error == 500){
					deferred.reject('Periksa kembali username dan password anda.');
				}else{
					deferred.reject('Harap coba kembali beberapa saat lagi.');
				}
			});	
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		getUser: function(id,token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/'+id+'?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		editUser: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/Employees',data,{headers:{'Content-Type':'application/json'}}).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				if(error == 500){
					deferred.reject(error);
				}else{
					deferred.reject(error);
				}
			});			

			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}

			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}

			return promise;
		}
	}
})
.service('ProfileService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		getProfile: function(id,token){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Employees/'+id+'?access_token='+token).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		editProfile: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/customer_profiles',data,
				{ headers: { 'Content-Type': 'application/json' } }
				).success(function(response){
					deferred.resolve(response);
				}).error(function(response,error){
					if(error == 500){
						deferred.reject('Periksa kembali email dan password anda.');
					}else{
						deferred.reject('Harap coba kembali beberapa saat lagi.');
					}
				});						
				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}
				return promise;
			}
		}
	})

.service('RegisterService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		tambahUser: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.post(BACKEND.URL+'/Employees',data,{ headers: { 'Content-Type': 'application/json' } }).success(function(response){
				deferred.resolve(response);
			}).error(function(response,error){
				if(error == 500){
					deferred.reject(error);
				}else{
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		}
	}
})

.service('PostService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		tambahPost: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			console.log("hai")
			$http.post(BACKEND.URL+'/Posts',data,{ headers: { 'Content-Type': 'application/json' } }).success(function(response){
				console.log(response);
				deferred.resolve(response);
			}).error(function(response,error){
				console.log(response)
				if(error == 500){
					console.log(response)
					deferred.reject(error);
				}else{
					console.log(response)
					deferred.reject(error);
				}
			});				
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}			
			return promise;
		},
		getAll: function(token) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/Posts/?Posts?filter=%7B%22date%22%3A%22date%20DESC%22%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getByUsername: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/userklubas/'+id+'/punyaLaporan').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		tambahPost: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'/Posts',data,
				{ headers: { 'Content-Type': 'application/json' } }
				).success(function(response){
					deferred.resolve(response);
				}).error(function(response,error){
					if(error == 500){
						deferred.reject(error);
					}else{
						deferred.reject(error);
					}
				});			

				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}

				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}

				return promise;
			},
			getComment: function(id) {
				var deferred = $q.defer();
				var promise = deferred.promise;
			https://batukotapintar.mybluemix.net/api/komenklubas?filter=%7B%22where%22%3A%7B%22laporanklubaid%22%3A1%7D%7D
			$http.get(BACKEND.URL+'/komenklubas?filter=%7B%22where%22%3A%7B%22laporanklubaid%22%3A'+id+'%7D%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		tambahKomentar: function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.post(BACKEND.URL+'/komenklubas',data,
				{ headers: { 'Content-Type': 'application/json' } }
				).success(function(response){
					deferred.resolve(response);
				}).error(function(response,error){
					if(error == 500){
						deferred.reject(error);
					}else{
						deferred.reject(error);
					}
				});				
				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}			
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}			
				return promise;
			}
		}
	})


