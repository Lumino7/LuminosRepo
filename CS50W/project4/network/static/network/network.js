let postView, profileView;
let postFormContainer;
let currentList;
let postForm;

//event listeners expect the 2nd argument to be a function. That's why it's always an anonymous function.
document.addEventListener('DOMContentLoaded', () => {
  postView = document.querySelector('#posts');
  postFormContainer = document.querySelector('#post-form-container');
  postForm = document.querySelector('#post-form');

  profileView = document.querySelector('#profile');


  // Use buttons to toggle between views
  document
    .querySelector('#all-posts')
    ?.addEventListener('click', () => renderList('all', 1)); //optional chaining: this line only runs if the code to the left of ? is not null or undefined.
  document
    .querySelector('#following')
    ?.addEventListener('click', () => {
      profileView.style.display = 'none';
      postFormContainer.style.display = 'none';
      renderList('following', 1);
    });

  postForm?.addEventListener('submit', (event) => create_post(event))

  renderList('all', 1);
});

function create_post(event) {
  event.preventDefault(); //prevents the default action, in this case the default html action of submit.

  const formData = new FormData(event.target); //FormData can construct a JS object directly from a form; event.target refers to the element that triggered the event.
  //In other words, to which element the addEventListener was used on. In this case, postForm.

  const body = {};
  formData.forEach((value, key) => (body[key] = value)); //the forEach's callback function takes a value then a key. this line assigns each key value pair from formdata to body.
  delete body['csrfmiddlewaretoken']; //the token needs to be in the header, not the body.

  fetch('posts/new', {
    method: 'POST',
    headers: {
      'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body), //converts the body (an object) to JSON format.
  }).then(() => {
    postForm.querySelector('#id_content').value = ''; //id_content gotten from devtools. Clears the form text field.
    renderList(currentList, 1);
  });
}

function renderList(list, page) {
  if (!(postView instanceof HTMLElement)) { //PURPOSE?
    return;
  }

  postView.innerHTML = '';

  currentList = list;

  fetch(`/posts/${list}/${page}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.error) {
        alert(result.error);
        return;
      }

      let postList = document.createElement('div');
      postList.id = 'post-list';
      postList.classList.add('list-group');

      let prevButton = document.createElement('button');
      prevButton.id = 'prev';
      prevButton.innerText = '<< Prev';
      prevButton.classList.add('btn', 'btn-text', 'text-primary', 'font-weight-bold');

      let nextButton = document.createElement('button');
      nextButton.id = 'next';
      nextButton.innerText = 'Next >>';
      nextButton.classList.add('btn', 'btn-text', 'text-primary', 'font-weight-bold');

      result.posts.forEach((post, index) => {
        //in any array function callback, the first parameter is the current element, 2nd is the index of the element
        let postListItem = document.createElement('div');
        postListItem.id = `post-${post.id}`;
        postListItem.classList.add('list-group-item', 'list-group-item-action');

        let col = document.createElement('div');
        col.classList.add('col');
        postListItem.appendChild(col);

        let header = document.createElement('div');
        header.classList.add('d-flex', 'align-items-center');
        col.appendChild(header);

        let createdBy = document.createElement('button');
        createdBy.id = 'created-by';
        createdBy.innerHTML = post.created_by.username;
        createdBy.classList.add('btn', 'btn-text', 'px-0', 'text-primary', 'font-weight-bold');
        createdBy.addEventListener('click', () =>
          renderProfile(post.created_by.username)
        );
        header.appendChild(createdBy);

        let createdAt = document.createElement('div');
        createdAt.innerHTML = post.created_at;
        createdAt.classList.add('p-0', 'small', 'text-secondary');
        header.appendChild(createdAt);

        let content = document.createElement('div');
        content.innerHTML = post.content;
        content.classList.add('p-0', 'py-4');
        col.appendChild(content);

        let actions = document.createElement('div');
        actions.classList.add('p-0', 'd-flex', 'gap-2');
        col.appendChild(actions);

        let likeButton = document.createElement('button');
        likeButton.innerHTML = `❤️ ${post.liked_by.length}`;
        likeButton.classList.add('btn', 'btn-light');
        if (!currentUserId) { //currentUserId is defined in the html file script
          likeButton.setAttribute('disabled', true)
        }
        likeButton.addEventListener('click', (event) => {
          likePost(result.posts[index])
            .then((response) => {
              return response.json();
            })
            .then((_post) => {
              if (_post.error) {
                alert(_post.error);
                return;
              }

              result.posts[index] = _post;

              likeButton.innerHTML = `❤️ ${_post.liked_by.length}`;
            });
        });

        actions.appendChild(likeButton);

        if (post.created_by.id == currentUserId) {
          let editButton = document.createElement('button');
          editButton.id = 'edit-post-button';
          editButton.innerText = 'Edit';
          editButton.classList.add('btn', 'btn-light');
          actions.appendChild(editButton);


          const editForm = postForm.cloneNode(true); //copies an element. if argument is true, it copies all the children as well. if false, no.
          editForm.style.display = 'none';
          editForm.setAttribute('method', 'patch');
          editForm.setAttribute('id', `edit-form-${post.id}`);
          editForm.setAttribute('action', `/posts/${post.id}/edit`); //Why is this needed?
          editForm.classList.add('col-6');
          editForm.querySelector('textarea').value = post.content;
          content.insertAdjacentElement('afterend', editForm);
          editForm.addEventListener('submit', (event) => {
            event.preventDefault();
            editPost(post.id)
              .then((response) => {
                return response.json();
              })
              .then((result) => {
                if (result.error) {
                  alert(result.error);
                  return;
                }

                content.innerHTML = result.content;

                content.style.display = 'block';
                editForm.style.display = 'none';
              });
          });

          editButton.addEventListener('click', () => {
            content.style.display = 'none';
            editForm.style.display = 'block';
          });
        }

        postList.appendChild(postListItem);
      });

      if (page > 1) {
        postView.appendChild(prevButton);
      }

      postView.appendChild(postList);

      if (page < result.num_pages) {
        postView.appendChild(nextButton);
      }

      prevButton.addEventListener('click', () => {
        page--;
        renderList(list, page);
      });

      nextButton.addEventListener('click', () => {
        page++;
        renderList(list, page);
      });
    });
}

function editPost(id) {
  const formData = new FormData(event.target);

  const body = {};
  formData.forEach((value, key) => (body[key] = value));
  delete body['csrfmiddlewaretoken'];

  return fetch(`posts/${id}/edit`, {
    method: 'PATCH',
    headers: {
      'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

function likePost(post) {
  const { id, liked_by } = post; //destructuring: extracting the properties id and liked_by from the post object and saves these to same-named variables. Equivalent to const id = post.id and const liked_by = post.liked_by

  const isLikedBy = liked_by.some((user) => { //returns true (and stops) if the function returns true for one of the array elements. First param of it's callback function is the name you give for the current element.
    return user.id === currentUserId;
  });

  return fetch(`posts/${id}/like`, {
    method: isLikedBy ? 'DELETE' : 'POST', //ternary expression. Uses left of : if true, right if false.
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    },
  });
}

function followUser(user) {
  const { id, username } = user;

  const isFollowing = user.followed_by.some((u) => {
    return u.id === currentUserId;
  });

  return fetch(`users/${username}/follow`, {
    method: isFollowing ? 'DELETE' : 'POST',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    },
  });
}

function renderProfile(username) {
  if (postFormContainer instanceof HTMLElement) {
    postFormContainer.style.display = 'none';
  }
  profileView.innerHTML = '';

  fetch(`/users/${username}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.error) {
        alert(result.error);
        return;
      }

      let content = document.createElement('div');
      content.id = 'profile-content';
      content.classList.add('p-0', 'py-4');

      let userHeader = document.createElement('h2');
      userHeader.id = 'userheader';
      userHeader.innerHTML = result.username;
      userHeader.classList.add(
        'mx-auto',
        'h-30',
        'col-6',
        'text-center',
        'text-bottom'
      );
      content.appendChild(userHeader);

      let userFollowers = document.createElement('div');
      userFollowers.id = 'userFollowers';

      function setFollowedByCount(user) {
        if (user && user.followed_by) {
          userFollowers.innerHTML = `${user.followed_by.length} followers`;
        } else {
          userFollowers.innerHTML = '0 followers';
        }
      }

      setFollowedByCount(result);
      userFollowers.classList.add('mx-auto', 'col-10', 'text-center');
      content.appendChild(userFollowers);

      let userFollowing = document.createElement('div');
      userFollowing.id = 'userFollowing';

      function setFollowingCount(user) {
        if (user && user.followed_by) {
          userFollowing.innerHTML = `Following ${result.following.length} users`;
        } else {
          userFollowing.innerHTML = 'Following 0 users';
        }
      }

      setFollowingCount(result);
      userFollowing.classList.add('mx-auto', 'col-10', 'text-center');
      content.appendChild(userFollowing);

      let actions = document.createElement('div');
      actions.classList.add('p-0', 'd-flex', 'justify-content-center', 'py-2');
      content.appendChild(actions);

      if (currentUserId && result.id !== currentUserId) {
        let followButton = document.createElement('button');

        function setFollowButtonText(user) {
          const isFollowing = user.followed_by.some((u) => {
            return u.id === currentUserId;
          });

          followButton.innerHTML = isFollowing ? 'Unfollow' : 'Follow';
        }

        setFollowButtonText(result);

        followButton.classList.add('btn', 'btn-light');
        followButton.addEventListener('click', (event) => {
          followUser(result)
          .then((response) => {
            return response.json();
          })
          .then((_user) => {
            if (_user.error) {
              alert(_user.error);
              return;
            }

            result = _user;

            setFollowButtonText(result);

            setFollowedByCount(result);

            setFollowingCount(result);
          });
        });

        actions.appendChild(followButton);
      }

      profileView.appendChild(content);

      renderList(username, 1);
    });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

//Questions: 56, 162