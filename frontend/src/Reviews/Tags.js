import React from "react";
import Chip from '@material-ui/core/Chip';

export default function Tags({ tags }) {
    if (tags.length > 0) {
        const newTags = tags.map((tag) => <Chip size="small" label={tag} />)
        // console.log(newTags)
        return (
            <div>
                {newTags}
            </div>
        )
    } else {
        return null;
    }
}