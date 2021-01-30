const submitComment = document.getElementById('submit-comment');
const addComment = document.querySelector('.add-comment');
const commentForm = document.getElementById('comment-form');

// var inputValue = document.getElementById("myTextInputID").value;

addComment.addEventListener ('input', (e) => {
  if ( addComment.value === '' ) {
    submitComment.style.color = '#8791b1'
    submitComment.style.pointerEvents = 'none'
  } else {
    submitComment.style.color = '#0c40ec'
    submitComment.style.pointerEvents = 'all'
  };
});
