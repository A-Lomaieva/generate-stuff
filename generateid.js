function copy(text) {
  var selection, range, mark;
  try {
    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('mark');
    mark.textContent = text;
    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
  } catch (err) {
    console.error('unable to copy, trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
    } catch (err) {
      console.error('unable to copy, falling back to prompt');
      window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
  }
}


function run() {
  var idName = document.getElementById('idName').value;
  var firstInt = Number(document.getElementById('firstInt').value);
  var lastInt = Number(document.getElementById('lastInt').value);
  console.log('Run', idName, firstInt, lastInt);
  var arr = [ ];

  for (var i = 0; i <= lastInt - firstInt; i++) {
    arr[i] = ('|' + idName + '&#8209;' + (i + firstInt) + '<a name="' + idName.toLowerCase() + (firstInt + i) + '"></a>' + '|');
   //arr[i] = ('|' + (i + firstInt) + '| ')
   }
  console.log(arr.join("\n"))
  var res = document.getElementById('result');
  res.innerHTML = arr.join("\n");
}

var button = document.getElementById('copy_button')
button.addEventListener('click', function () { copy(document.getElementById('result').innerHTML); })
var button = document.getElementById('run')
button.addEventListener('click', run)

