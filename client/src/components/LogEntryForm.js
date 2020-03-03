import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from '../API';

const LogentryForm = ({ location, onClose }) => {

    const { register, handleSubmit} = useForm();

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            onClose();
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(true);
        }
        
    }

    return(
        <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
            { error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="title">Title</label>
            <input name="title" ref={register}/>
            <label htmlFor="comments">Comments</label>
            <textarea name="comments" row={3} ref={register}/>
            <label htmlFor="description">Description</label>
            <textarea name="description" row={3} ref={register}/>
            <label htmlFor="image">Image</label>
            <input name="image" ref={register}/>
            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" ref={register} required/>
            <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
        </form>
    );
};

export default LogentryForm;