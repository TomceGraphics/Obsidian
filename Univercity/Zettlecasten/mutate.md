---
tags:
  - data-visualization
  - function
  - r-programming-language
---
# The `mutate()` Function in R (`dplyr`)

The `mutate()` function is used to create new columns or transform existing ones while preserving the rest of the data frame.

## Usage

The syntax is:
`mutate(data, new_column = calculation_or_transformation)`

### Example: Creating a Category
You can use `mutate()` with `ifelse()` to create categories based on values.

```R
library(dplyr)

# Create a letter grade column based on numerical grades
students_mutated <- mutate(students, 
    grade_category = ifelse(grade >= 90, "A", 
                     ifelse(grade >= 80, "B", 
                     ifelse(grade >= 70, "C", "F")))
)
```

### Example: Mathematical Transformation
```R
# Calculate age in months
students_age_months <- mutate(students, age_months = age * 12)
```

## Related Functions
- [[arrange]]: Used to reorder rows.
- [[rename]]: Used to change column names.
- [[group_by]]: Used to group data for operations.
- [[string_manipulation]]: Search and replace text.
