---
tags:
  - data-visualization
  - function
  - r-programming-language
  - string-manipulation
---
# String Manipulation in R: `grep`, `grepl`, `sub`, `gsub`, `trimws`, `nchar`, and `substr`

These Base R functions are essential for searching, replacing, and cleaning text within character vectors or column names.

## 1. Searching: `grep()` and `grepl()`

### `grepl()` (Logical)
Returns a **logical vector** (`TRUE` or `FALSE`) indicating if a pattern was found in each element.
- **Use case:** Filtering rows or checking existence.

```R
# Check which intersections contain "Alameda"
has_alameda <- grepl("Alameda", cameras$intersection)
table(has_alameda)
```

### `grep()` (Index or Value)
Returns the **indices** (positions) or the **actual values** where the pattern matches.
- **Use case:** Finding specific elements or subsetting.

```R
# Get indices of matches
grep("Alameda", cameras$intersection)

# Get the actual names of the intersections
grep("Alameda", cameras$intersection, value = TRUE)
```

---

## 2. Replacing: `sub()` and `gsub()`

### `sub()` (Single Replacement)
Replaces only the **first** occurrence of a pattern in each string.

```R
# Replace the first dot with a dash in column names
names(cameras) <- sub("\\.", "-", names(cameras))
```

### `gsub()` (Global Replacement)
Replaces **all** occurrences of a pattern in each string.

```R
# Replace ALL dots with dashes in column names
names(cameras) <- gsub("\\.", "-", names(cameras))
```

---

## 3. Cleaning: `trimws()`
Removes leading and/or trailing whitespace from a string.
- **Use case:** Cleaning up data with inconsistent spacing.

```R
text <- "   Hello World   "

# Remove both leading and trailing space
trimws(text) # Result: "Hello World"
```

---

## 4. Measuring: `nchar()` vs. `length()`
It is important to understand the difference between these two:
- **`nchar()`**: Returns the number of **characters** in each string (word length).
- **`length()`**: Returns the number of **elements** in the vector (list length).

```R
fruits <- c("apple", "banana", "cherry")

nchar(fruits)  # Result: 5 6 6
length(fruits) # Result: 3
```

---

## 5. Extracting: `substr()`
Extracts or replaces parts of a character vector based on position.
- **Syntax:** `substr(x, start, stop)`

```R
# Extract the first 3 letters
substr("Baltimore", 1, 3) # Result: "Bal"

# Extract letters 2 to 5
substr("Baltimore", 2, 5) # Result: "alti"
```

---

## 3. Key Differences at a Glance

| Function | Primary Purpose | Result Type |
| :--- | :--- | :--- |
| **`grepl`** | Search | Logical Vector (`TRUE`/`FALSE`) |
| **`grep`** | Search | Integer (Index) or Character (Value) |
| **`sub`** | Replace | Character Vector (1st match only) |
| **`gsub`** | Replace | Character Vector (All matches) |
| **`trimws`** | Trim Whitespace | Character Vector |
| **`nchar`** | Count Characters | Integer Vector |
| **`substr`** | Extract Substring | Character Vector |
| **`length`** | Count Elements | Integer |

## 4. Pro-Tip: Escaping Special Characters
Characters like `.`, `*`, `+`, `(`, `)` have special meanings in regular expressions. To match them literally, use a double backslash `\\`.

```R
# To match a literal period "."
sub("\\.", "_", text) 
```

## Related Functions
- [[arrange]]: Reorder rows.
- [[mutate]]: Create or transform columns.
- `tolower()` / `toupper()`: Change case.
- `strsplit()`: Split strings.
