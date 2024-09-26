let entries = JSON.parse(localStorage.getItem('entries')) || [];

const entryForm = document.getElementById('entry-form');
const entriesList = document.getElementById('entries-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const netBalanceEl = document.getElementById('net-balance');
const filters = document.querySelectorAll('input[name="filter"]');

// Function to render entries
function renderEntries(filter = 'all') {
  entriesList.innerHTML = '';
  let filteredEntries = entries.filter(entry => {
    return filter === 'all' || entry.type === filter;
  });
  


  const h1 = document.createElement('h1');
    h1.textContent ="Transaction details"
    
    entriesList.append(h1);
    console.log(h1);
    
  
  
  filteredEntries.forEach((entry, index) => {
    
     
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${entry.description} - ₹${entry.amount}</span>
      <div>
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
    console.log(li);
    
    
    entriesList.appendChild(li);
   
  });

  updateSummary();
}

// Function to update totals
function updateSummary() {
  const totalIncome = entries.filter(entry => entry.type === 'income')
                             .reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = entries.filter(entry => entry.type === 'expense')
                               .reduce((sum, entry) => sum + entry.amount, 0);
  totalIncomeEl.textContent = totalIncome;
  totalExpensesEl.textContent = totalExpenses;
  netBalanceEl.textContent = totalIncome - totalExpenses;
}

// Add new entry
entryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.querySelector('input[name="type"]:checked').value;

  if (description && amount) {
    entries.push({ description, amount, type });
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
    entryForm.reset();
  }
});

// Edit entry
function editEntry(index) {
  const entry = entries[index];
  document.getElementById('description').value = entry.description;
  document.getElementById('amount').value = entry.amount;
  document.querySelector(`input[name="type"][value="${entry.type}"]`).checked = true;
  deleteEntry(index);
}

// Delete entry
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem('entries', JSON.stringify(entries));
  renderEntries();
}

// Filter entries
filters.forEach(filter => {
  filter.addEventListener('change', (e) => {
    renderEntries(e.target.value);
  });
});

// Load entries from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  renderEntries();
});

console.log(filters);
