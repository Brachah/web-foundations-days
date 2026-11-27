

let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}
console.log(searchNotes("DAD")); //[]
console.log(searchNotes("PROJECT"))//[{ id: 3, text: "Email the project report to Grace", category: "work" }]

function longestNote() {
  // Handle empty array
  if (notes.length === 0) {
    return null;
  }

  // Compare the lengths of the notes
  return notes.reduce((longest, current) => {
    return current.text.length > longest.text.length ? current : longest;
  });
}
console.log(longestNote()); // {id: 3,text: "Email the project report to Grace",category: "work"}

function countByCategory() {
  let count = {};

  for (let note of notes) {
    let category = note.category;

    if (count[category]) {
      count[category]++;
    } else {
      count[category] = 1;
    }
  }

  return count;
}

console.log(countByCategory()); //{personal: 2,study: 2,work: 1}

function getSummary() {
  let total = notes.length;
  let categoryCounts = countByCategory();

  let noteWord = total === 1 ? "note" : "notes";

  let summary = Object.entries(categoryCounts)
    .map(([category, count]) => `${count} ${category}`)
    .join(", ");

  return `${total} ${noteWord}: ${summary}.`;
}

console.log(getSummary());//5 notes: 2 personal, 2 study, 1 work.

function isDuplicate(text) {
  return notes.some(note =>
    note.text.trim().toLowerCase() === text.trim().toLowerCase()
  );
}

console.log(isDuplicate("CALL MUM")); // true
console.log(isDuplicate("CALL DAD")); //false

function addNote(text, category) {

  // Remove extra spaces
  text = text.trim();

  // Check if text is empty or exceeds 200 characters
  if (text.length < 1 || text.length > 200) {
    console.log("Invalid note: Text must be between 1 and 200 characters.");
    return false;
  }

  // Check for duplicate notes
  if (isDuplicate(text)) {
    console.log("Duplicate note: This note already exists.");
    return false;
  }

  // Check valid category
  if (!["personal", "work", "study"].includes(category)) {
    console.log("Invalid category: Choose personal, work or study.");
    return false;
  }

  // Generate a new ID
  let newId = notes.length > 0
    ? Math.max(...notes.map(note => note.id)) + 1
    : 1;

  // Add the new note
  notes.push({
    id: newId,
    text: text,
    category: category
  });

  console.log("Note added successfully!");

  return true;
}

console.log(addNote("Complete Assignment Day 3", "study"));//Note added successfully! true
console.log(addNote("Prepare daily report", "business"));//Invalid category: Choose personal, work or study. false

