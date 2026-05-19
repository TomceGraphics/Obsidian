---
tags:
  - data-visualization
  - function
  - r-programming-language
---
# The `rename()` Function in R (`dplyr`)

The `rename()` function is used to change the names of individual columns in a data frame. It is much easier and safer than modifying `colnames()` directly.

## Usage

The syntax is:
`rename(data, new_name = old_name)`

### Example

```R
library(dplyr)

# Rename 'age' to 'student_age' and 'grade' to 'student_grade'
students_renamed <- rename(students, 
                           student_age = age, 
                           student_grade = grade)
```

## Key Rules
1. **New Name First**: You always put the `new_name` on the left and the `old_name` on the right.
2. **Selectivity**: Only the columns you specify are renamed; all other columns remain the same.

## Related Functions
- [[arrange]]: Used to reorder rows.
- [[mutate]]: Used to create or transform columns.
- [[group_by]]: Used to group data for operations.
- [[string_manipulation]]: Search and replace text.
