// App Header Component
class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #4361ee;
                    color: white;
                    padding: 1rem 2rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                h1 {
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                
                @media (max-width: 480px) {
                    :host {
                        padding: 1rem;
                    }
                    
                    h1 {
                        font-size: 1.25rem;
                    }
                }
            </style>
            <div class="header-container">
                <h1>Notes App</h1>
                <p id="noteCount">0 notes</p>
            </div>
        `;
    }

    updateNoteCount(count) {
        this.shadowRoot.getElementById('noteCount').textContent = 
            `${count} ${count === 1 ? 'note' : 'notes'}`;
    }
}

customElements.define('app-header', AppHeader);

// Note Input Component
class NoteInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const label = this.getAttribute('label') || '';
        const name = this.getAttribute('name') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const minlength = this.getAttribute('minlength') || '';
        const maxlength = this.getAttribute('maxlength') || '';
        const required = this.hasAttribute('required');

        this.shadowRoot.innerHTML = `
            <style>
                .input-group {
                    margin-bottom: 1.5rem;
                }
                
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--dark-color);
                }
                
                input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ced4da;
                    border-radius: var(--border-radius);
                    font-size: 1rem;
                    transition: var(--transition);
                }
                
                input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.25);
                }
                
                .error-message {
                    color: var(--danger-color);
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                    display: none;
                }
                
                .input-error {
                    border-color: var(--danger-color) !important;
                }
            </style>
            <div class="input-group">
                <label for="${name}">${label}</label>
                <input 
                    type="text" 
                    id="${name}" 
                    name="${name}" 
                    placeholder="${placeholder}"
                    ${minlength ? `minlength="${minlength}"` : ''}
                    ${maxlength ? `maxlength="${maxlength}"` : ''}
                    ${required ? 'required' : ''}
                >
                <div class="error-message" id="${name}-error"></div>
            </div>
        `;

        const input = this.shadowRoot.querySelector('input');
        const errorElement = this.shadowRoot.querySelector('.error-message');

        input.addEventListener('input', () => {
            this.validateInput(input, errorElement);
        });

        input.addEventListener('blur', () => {
            this.validateInput(input, errorElement);
        });
    }

    validateInput(input, errorElement) {
        if (input.validity.valid) {
            input.classList.remove('input-error');
            errorElement.style.display = 'none';
            return true;
        } else {
            input.classList.add('input-error');
            errorElement.textContent = this.getErrorMessage(input);
            errorElement.style.display = 'block';
            return false;
        }
    }

    getErrorMessage(input) {
        if (input.validity.valueMissing) {
            return 'This field is required';
        } else if (input.validity.tooShort) {
            return `Should be at least ${input.minLength} characters`;
        } else if (input.validity.tooLong) {
            return `Should be no more than ${input.maxLength} characters`;
        }
        return 'Invalid input';
    }

    getValue() {
        return this.shadowRoot.querySelector('input').value;
    }

    isValid() {
        const input = this.shadowRoot.querySelector('input');
        const errorElement = this.shadowRoot.querySelector('.error-message');
        return this.validateInput(input, errorElement);
    }
}

customElements.define('note-input', NoteInput);

// Note Textarea Component
class NoteTextarea extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const label = this.getAttribute('label') || '';
        const name = this.getAttribute('name') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const minlength = this.getAttribute('minlength') || '';
        const required = this.hasAttribute('required');

        this.shadowRoot.innerHTML = `
            <style>
                .input-group {
                    margin-bottom: 1.5rem;
                }
                
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--dark-color);
                }
                
                textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ced4da;
                    border-radius: var(--border-radius);
                    font-size: 1rem;
                    font-family: inherit;
                    min-height: 120px;
                    resize: vertical;
                    transition: var(--transition);
                }
                
                textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.25);
                }
                
                .error-message {
                    color: var(--danger-color);
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                    display: none;
                }
                
                .input-error {
                    border-color: var(--danger-color) !important;
                }
            </style>
            <div class="input-group">
                <label for="${name}">${label}</label>
                <textarea 
                    id="${name}" 
                    name="${name}" 
                    placeholder="${placeholder}"
                    ${minlength ? `minlength="${minlength}"` : ''}
                    ${required ? 'required' : ''}
                ></textarea>
                <div class="error-message" id="${name}-error"></div>
            </div>
        `;

        const textarea = this.shadowRoot.querySelector('textarea');
        const errorElement = this.shadowRoot.querySelector('.error-message');

        textarea.addEventListener('input', () => {
            this.validateInput(textarea, errorElement);
        });

        textarea.addEventListener('blur', () => {
            this.validateInput(textarea, errorElement);
        });
    }

    validateInput(textarea, errorElement) {
        if (textarea.validity.valid) {
            textarea.classList.remove('input-error');
            errorElement.style.display = 'none';
            return true;
        } else {
            textarea.classList.add('input-error');
            errorElement.textContent = this.getErrorMessage(textarea);
            errorElement.style.display = 'block';
            return false;
        }
    }

    getErrorMessage(textarea) {
        if (textarea.validity.valueMissing) {
            return 'This field is required';
        } else if (textarea.validity.tooShort) {
            return `Should be at least ${textarea.minLength} characters`;
        }
        return 'Invalid input';
    }

    getValue() {
        return this.shadowRoot.querySelector('textarea').value;
    }

    isValid() {
        const textarea = this.shadowRoot.querySelector('textarea');
        const errorElement = this.shadowRoot.querySelector('.error-message');
        return this.validateInput(textarea, errorElement);
    }
}

customElements.define('note-textarea', NoteTextarea);

// Note Card Component
class NoteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const id = this.getAttribute('id') || '';
        const title = this.getAttribute('title') || '';
        const body = this.getAttribute('body') || '';
        const createdAt = this.getAttribute('created-at') || '';
        const archived = this.getAttribute('archived') === 'true';

        const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background-color: white;
                    border-radius: var(--border-radius);
                    padding: 1.5rem;
                    box-shadow: var(--box-shadow);
                    transition: var(--transition);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                
                .note-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
                
                .note-card h3 {
                    margin-bottom: 0.5rem;
                    color: var(--primary-color);
                }
                
                .note-card p {
                    margin-bottom: 1rem;
                    color: var(--gray-color);
                    flex-grow: 1;
                }
                
                .note-date {
                    font-size: 0.8rem;
                    color: var(--gray-color);
                    margin-bottom: 1rem;
                }
                
                .note-actions {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: flex-end;
                }
                
                .note-archived {
                    border-left: 4px solid var(--accent-color);
                }
                
                .btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: var(--transition);
                }
                
                .btn-archive {
                    background-color: var(--success-color);
                    color: white;
                }
                
                .btn-archive:hover {
                    background-color: #3a86ff;
                }
                
                .btn-delete {
                    background-color: var(--danger-color);
                    color: white;
                }
                
                .btn-delete:hover {
                    background-color: #d90429;
                }
            </style>
            <div class="note-card ${archived ? 'note-archived' : ''}">
                <h3>${title}</h3>
                <p>${body}</p>
                <div class="note-date">${formattedDate}</div>
                <div class="note-actions">
                    <button class="btn btn-archive" data-id="${id}">
                        ${archived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button class="btn btn-delete" data-id="${id}">Delete</button>
                </div>
            </div>
        `;
    }
}

customElements.define('note-card', NoteCard);