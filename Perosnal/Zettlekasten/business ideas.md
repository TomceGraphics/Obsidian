---
tags:
  - career
  - list
---
- data viz for personal coaches

# Landing Pages
find business on maps that need a website but don’t have one yet and offer them websites. 
quick money scheme not long term career work.
## Agent prompts
**"Lead Hunter" Agent**
```
Open Chrome and search Google Maps for local businesses (e.g., roofers, cafes, plumbers, dental clinics) in [Your City/Target Area]. For each business, check if they have a website. If they do not have a website, or if their website is old, non-responsive, or lacks a mobile layout, collect: Business Name, Niche, Phone Number, and Website URL (if they have a bad one). Compile this data into a structured `leads.csv` file in my workspace workspace
```

**Auto-Generate a Custom Mockup Website**
```
Read row 1 of `leads.csv`. Based on that business's niche and name, build a modern, high-converting React/Tailwind landing page for them. Include a hero section, an online booking form, a services grid, and placeholder customer reviews. Ensure it has animations and looks like a premium €1,500 site. Save the preview code in a subfolder called `/mockups/[BusinessName]`
```


**Write the Personal Outreach Script**
```
Act as a freelance web design agency owner. Write a highly personalized email/cold-call script targeting the business in row 1 of `leads.csv`.

- Point out exactly what their current online presence is lacking (e.g., 'I noticed you don't have a mobile site on Google Maps').
- Tell them you already built a custom interactive mockup tailored to their business name.
- Offer to launch, host, and complete the full site for a flat rate of €500.
- Keep the tone friendly, brief, and completely human-sounding."
```

