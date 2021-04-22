import React, { FC, useState } from 'react';
import { Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';

interface SearchResultsProps {
    title: string;
}

const SearchResults: FC<SearchResultsProps> = ({ title }) => {
    const [results, setResults] = useState<string[]>([]);

    const search = async () => {
        const fetchResults = await fetch("https://cors-anywhere.herokuapp.com/https://www.google.com/search?q=pfizer+vaccine");

        if (!fetchResults.ok) {
            setResults([`Error: ${fetchResults.status} ${fetchResults.statusText}`]);
            return;
        }

        const text = await fetchResults.text();
        console.log(text.substring(0, 10))
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const headlines = doc.querySelectorAll("h3.LC20lb.DKV0Md");
        const acc: string[] = [];
        headlines.forEach(x => acc.push(x.textContent || ""))
        setResults(acc);
    }

    return (
    <>
        <Typography variant="h1">{title}</Typography>
        <Button onClick={search}>Search</Button>
        <List>
            {results.length > 0
                ? results.map(result => (<ListItem key={result}><ListItemText>{result}</ListItemText></ListItem>)) 
                : (<ListItem><ListItemText>No results found.</ListItemText></ListItem>)}
        </List>
    </>
    );
};

export default SearchResults;