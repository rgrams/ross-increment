'use babel';

import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ross-increment:increment': () => this.increment()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  increment() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selections = editor.getSelectionsOrderedByBufferPosition()

      let startNumber = 1
      let checkpoint
      let insertOptions

      if (selections.length > 0) {
         checkpoint = editor.getBuffer().createCheckpoint()
         insertOptions = { select: true }
         let firstSelectedNum = parseFloat(selections[0].getText(), 10)
         if (!isNaN(firstSelectedNum)) { startNumber = firstSelectedNum }
      }

      for (var i = 0; i < selections.length; i++) {
         let selection = selections[i]
         let text = (startNumber + i).toString()
         selection.insertText(text, insertOptions)
      }
      if (checkpoint) {
         editor.getBuffer().groupChangesSinceCheckpoint(checkpoint)
      }
    }
  }
};
