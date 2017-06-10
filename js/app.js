var containers = ['tab-one','tab-two','tab-three','tab-four'];
function makeRequest (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function getData (event) {
        var id = event ? event.getAttribute("id") : 'tab-one',
            url = 'data/' + id + '.json',
            contentPanel = document.getElementById(id + '-panel');
    if(containers.indexOf(id) >= 0){
	makeRequest('GET', url)
	.then(function (datums) {
	  var data = JSON.parse(datums);
          contentPanel.innerHTML = data.tabContent;
          containers.remove(id);
	})
	.catch(function (err) {
	  console.error('Augh, there was an error!', err.statusText);
	});
    }
}