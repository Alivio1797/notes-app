// Notes data
const notesData = [
  {
      id: 'notes-jT-jjsyz61J8XKiI',
      title: 'Welcome to Notes, Dimas!',
      body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
      createdAt: '2022-07-28T10:03:12.594Z',
      archived: false,
  },
  {
      id: 'notes-aB-cdefg12345',
      title: 'Meeting Agenda',
      body: 'Discuss project updates and assign tasks for the upcoming week.',
      createdAt: '2022-08-05T15:30:00.000Z',
      archived: false,
  },
  {
      id: 'notes-XyZ-789012345',
      title: 'Shopping List',
      body: 'Milk, eggs, bread, fruits, and vegetables.',
      createdAt: '2022-08-10T08:45:23.120Z',
      archived: false,
  },
  {
      id: 'notes-1a-2b3c4d5e6f',
      title: 'Personal Goals',
      body: 'Read two books per month, exercise three times a week, learn a new language.',
      createdAt: '2022-08-15T18:12:55.789Z',
      archived: false,
  },
  {
      id: 'notes-LMN-456789',
      title: 'Recipe: Spaghetti Bolognese',
      body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
      createdAt: '2022-08-20T12:30:40.200Z',
      archived: false,
  },
  {
      id: 'notes-QwErTyUiOp',
      title: 'Workout Routine',
      body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
      createdAt: '2022-08-25T09:15:17.890Z',
      archived: false,
  },
  {
      id: 'notes-abcdef-987654',
      title: 'Book Recommendations',
      body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
      createdAt: '2022-09-01T14:20:05.321Z',
      archived: false,
  },
  {
      id: 'notes-zyxwv-54321',
      title: 'Daily Reflections',
      body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
      createdAt: '2022-09-07T20:40:30.150Z',
      archived: false,
  },
  {
      id: 'notes-poiuyt-987654',
      title: 'Travel Bucket List',
      body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
      createdAt: '2022-09-15T11:55:44.678Z',
      archived: false,
  },
  {
      id: 'notes-asdfgh-123456',
      title: 'Coding Projects',
      body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
      createdAt: '2022-09-20T17:10:12.987Z',
      archived: false,
  },
  {
      id: 'notes-5678-abcd-efgh',
      title: 'Project Deadline',
      body: 'Complete project tasks by the deadline on October 1st.',
      createdAt: '2022-09-28T14:00:00.000Z',
      archived: false,
  },
  {
      id: 'notes-9876-wxyz-1234',
      title: 'Health Checkup',
      body: 'Schedule a routine health checkup with the doctor.',
      createdAt: '2022-10-05T09:30:45.600Z',
      archived: false,
  },
  {
      id: 'notes-qwerty-8765-4321',
      title: 'Financial Goals',
      body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
      createdAt: '2022-10-12T12:15:30.890Z',
      archived: false,
  },
  {
      id: 'notes-98765-54321-12345',
      title: 'Holiday Plans',
      body: 'Research and plan for the upcoming holiday destination.',
      createdAt: '2022-10-20T16:45:00.000Z',
      archived: false,
  },
  {
      id: 'notes-1234-abcd-5678',
      title: 'Language Learning',
      body: 'Practice Spanish vocabulary for 30 minutes every day.',
      createdAt: '2022-10-28T08:00:20.120Z',
      archived: false,
  },
];

// DOM Elements
const notesContainer = document.getElementById('notes-container');
const noteFormContainer = document.getElementById('note-form-container');
const noteTitleInput = document.getElementById('note-title');
const noteBodyInput = document.getElementById('note-body');
const addNoteBtn = document.getElementById('add-note');
const saveNoteBtn = document.getElementById('save-note');
const cancelNoteBtn = document.getElementById('cancel-note');
const toggleArchiveBtn = document.getElementById('toggle-archive');

// App State
let notes = [];
let showArchived = false;
let editingNoteId = null;

// Initialize the app
function init() {
  // Load notes from localStorage or use initial data
  const savedNotes = localStorage.getItem('notes-app-data');
  notes = savedNotes ? JSON.parse(savedNotes) : [...notesData];
  
  // Render notes
  renderNotes();
  
  // Set up event listeners
  addNoteBtn.addEventListener('click', showNoteForm);
  saveNoteBtn.addEventListener('click', saveNote);
  cancelNoteBtn.addEventListener('click', hideNoteForm);
  toggleArchiveBtn.addEventListener('click', toggleArchivedNotes);
}

// Render notes based on current state
function renderNotes() {
  // Filter notes based on archive status
  const filteredNotes = notes.filter(note => 
      showArchived ? note.archived : !note.archived
  );
  
  // Clear the container
  notesContainer.innerHTML = '';
  
  // Add each note to the container
  if (filteredNotes.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.textContent = showArchived 
          ? 'No archived notes' 
          : 'No active notes. Click "Add Note" to create one.';
      notesContainer.appendChild(emptyState);
  } else {
      filteredNotes.forEach(note => {
          notesContainer.appendChild(createNoteElement(note));
      });
  }
  
  // Update the toggle button text
  toggleArchiveBtn.textContent = showArchived 
      ? 'Show Active' 
      : 'Show Archived';
}

// Create a note element
function createNoteElement(note) {
  const noteElement = document.createElement('div');
  noteElement.className = `note-card ${note.archived ? 'archived' : ''}`;
  
  const noteHeader = document.createElement('div');
  noteHeader.className = 'note-header';
  
  const noteTitle = document.createElement('div');
  noteTitle.className = 'note-title';
  noteTitle.textContent = note.title;
  
  const noteDate = document.createElement('div');
  noteDate.className = 'note-date';
  noteDate.textContent = formatDate(note.createdAt);
  
  const noteBody = document.createElement('div');
  noteBody.className = 'note-body';
  noteBody.textContent = note.body;
  
  const noteActions = document.createElement('div');
  noteActions.className = 'note-actions';
  
  const editBtn = document.createElement('button');
  editBtn.className = 'btn-edit';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => editNote(note.id));
  
  const archiveBtn = document.createElement('button');
  archiveBtn.className = 'btn-archive';
  archiveBtn.textContent = note.archived ? 'Unarchive' : 'Archive';
  archiveBtn.addEventListener('click', () => toggleNoteArchive(note.id));
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteNote(note.id));
  
  // Assemble the note element
  noteActions.appendChild(editBtn);
  noteActions.appendChild(archiveBtn);
  noteActions.appendChild(deleteBtn);
  
  noteHeader.appendChild(noteTitle);
  noteHeader.appendChild(noteDate);
  
  noteElement.appendChild(noteHeader);
  noteElement.appendChild(noteBody);
  noteElement.appendChild(noteActions);
  
  return noteElement;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Show the note form
function showNoteForm() {
  noteFormContainer.style.display = 'block';
  noteTitleInput.focus();
}

// Hide the note form
function hideNoteForm() {
  noteFormContainer.style.display = 'none';
  noteTitleInput.value = '';
  noteBodyInput.value = '';
  editingNoteId = null;
}

// Save a new or edited note
function saveNote() {
  const title = noteTitleInput.value.trim();
  const body = noteBodyInput.value.trim();
  
  if (!title || !body) {
      alert('Please enter both title and content');
      return;
  }
  
  if (editingNoteId) {
      // Update existing note
      notes = notes.map(note => 
          note.id === editingNoteId 
              ? { ...note, title, body, updatedAt: new Date().toISOString() } 
              : note
      );
  } else {
      // Create new note
      const newNote = {
          id: generateId(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false
      };
      notes.push(newNote);
  }
  
  // Save to localStorage
  localStorage.setItem('notes-app-data', JSON.stringify(notes));
  
  // Refresh the display
  hideNoteForm();
  renderNotes();
}

// Edit a note
function editNote(id) {
  const note = notes.find(note => note.id === id);
  if (note) {
      editingNoteId = id;
      noteTitleInput.value = note.title;
      noteBodyInput.value = note.body;
      showNoteForm();
  }
}

// Toggle note archive status
function toggleNoteArchive(id) {
  notes = notes.map(note => 
      note.id === id ? { ...note, archived: !note.archived } : note
  );
  localStorage.setItem('notes-app-data', JSON.stringify(notes));
  renderNotes();
}

// Delete a note
function deleteNote(id) {
  if (confirm('Are you sure you want to delete this note?')) {
      notes = notes.filter(note => note.id !== id);
      localStorage.setItem('notes-app-data', JSON.stringify(notes));
      renderNotes();
  }
}

// Toggle between showing archived/active notes
function toggleArchivedNotes() {
  showArchived = !showArchived;
  renderNotes();
}

// Generate a unique ID
function generateId() {
  return 'note-' + Math.random().toString(36).substring(2, 15);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);