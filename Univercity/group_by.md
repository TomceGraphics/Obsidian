---
tags:
  - data-visualization
  - function
  - r-programming-language
---
# The `group_by()` Function in R (`dplyr`)

The `group_by()` function takes an existing data frame and converts it into a grouped data frame where operations are performed "by group".

## Usage

The syntax is:
`group_by(data, column1, column2, ...)`

### Example: Grouping by Major
```R
library(dplyr)

# Group students by their major
students_grouped <- group_by(students, major)

# When you print this, it will show "Groups: major" at the top
print(students_grouped)
```

## Why use `group_by`?
`group_by()` is almost always followed by `summarise()` or `mutate()` to perform calculations within each category.

### Chaining with Summarise
```R
# Calculate average grade per major
students_avg_by_major <- students %>%
  group_by(major) %>%
  summarise(avg_grade = mean(grade))
```

## Related Functions
- [[arrange]]: Used to reorder rows (can be used within groups).
- [[mutate]]: Used to create or transform columns.
- [[rename]]: Used to change column names.
- [[string_manipulation]]: Search and replace text.
