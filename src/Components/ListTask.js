import React, { useState } from 'react';
import './task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ListTask = (props) => {

    const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);

    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 1000));
    }

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    }

    var updatedS = time.s, updatedM = time.m, updatedH = time.h

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0
        }
        updatedS++;
        return setTime({ s: updatedS, m: updatedM, h: updatedH });
    }

    const tasks = props.tasks;
    const listTask = tasks
    // .filter((task) => {
    //     return task.task.indexOf(filterText) >= 0
    // })
    .map((task) => {
        return (
            <div className="cmn-margin">
                <span className="timer">{(time.h >= 10) ? time.h : "0" + time.h}</span>&nbsp; &nbsp;
                <span className="timer">{(time.m >= 10) ? time.m : "0" + time.m}</span>&nbsp; &nbsp;
                <span className="timer">{(time.s >= 10) ? time.s : "0" + time.s}</span>&nbsp; &nbsp;
                <div className="inline">
                    <button className="start-btn" type="submit" onClick={start}>Start</button>
                    <div className="list-task" key={task.key}>
                        <p>
                            <input
                                type="text"
                                id={task.key}
                                value={task.text}
                                onChange={(e) => { props.editTask(e.target.value, task.key) }}
                            />
                            <span>
                                <FontAwesomeIcon
                                    className="faicons"
                                    icon="trash"
                                    onClick={() => props.deleteTask(task.key)}
                                />
                            </span>
                        </p>
                    </div>
                    <button className="stop-btn" type="submit" onClick={stop}>Stop</button>
                </div>
            </div>
        )
    })
    
    return (
        <div>
            {listTask}
        </div>
    );
}

export default ListTask;
