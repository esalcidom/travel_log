import React from 'react';

const LogentryForm = () => {

    return(
        <form className="entry-form">
            <label for="title">Title</label>
            <input name="title" />
            <label for="comments">Comments</label>
            <textarea name="comments" row={3}/>
            <label for="description">Description</label>
            <textarea name="description" row={3}/>
            <label for="image">Image</label>
            <input name="image" />
            <label for="visitDate">Visit Date</label>
            <input name="visitDate" type="date"/>
            <button>Create Entry</button>
        </form>
    );
};

export default LogentryForm;