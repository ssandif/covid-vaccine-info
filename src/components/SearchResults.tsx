import React, { FC, useState } from 'react';
import { Button, List, ListItem, ListItemText, Typography, Link} from '@material-ui/core';

interface SearchResultsProps {
    title: string;
    searchUrl: string;
}

interface Headline {
    text: string;
    link?: string;
}


const SearchResults: FC<SearchResultsProps> = ({ title, searchUrl }) => {
    const [results, setResults] = useState<Headline[]>([]);

    const search = async () => {
        const fetchResults = await fetch(searchUrl);

        if (!fetchResults.ok) {
            const error = {text: `Error: ${fetchResults.status} ${fetchResults.statusText}` }; 
            setResults([error]);
            
            return;
        }

        const text = await fetchResults.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const headlines = doc.querySelectorAll("div.yuRUbf > a");

        const acc: Headline[] = [];
        headlines.forEach(x => acc.push({text: x.textContent || "" , link: x.getAttribute("href") || undefined }));
        setResults(acc);
    }

    return (
    <>
        <Typography variant="h1">{title}</Typography>
        <Button onClick={search}>Search</Button>
        <List>
            {results.length > 0
                ? results.map(result => (<ListItem key={result.text}><ListItemText><Link href={result.link} target="_blank" rel="noopener" >{result.text}</Link></ListItemText></ListItem>)) 
                : (<ListItem><ListItemText>No results found.</ListItemText></ListItem>)}
        </List>
    </>
    );
};

export default SearchResults;