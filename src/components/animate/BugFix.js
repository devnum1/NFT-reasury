import React from 'react'

export function BugFix() {
    const data = [
        {id: 1, name: "Deterrion Quintez COrley", age: 27},
        {id: 1, name: "Deterrion Quintez COrley", age: 27},
        {id: 1, name: "Deterrion Quintez COrley", age: 27},
        {id: 1, name: "Deterrion Quintez COrley", age: 27},
        {id: 1, name: "Deterrion Quintez COrley", age: 27},
        {id: 1, name: "Deterrion Quintez COrley", age: 27}
    ]
    return (
        <>
            <div className='container container-fluid'>
                <h2 className='bg-primary text-center text-white'>
                    Hello, Nice to meet you!
                </h2>
                <p className='content '>
                    I am a senior full stack developer with nealy ten years of experience in software development.
                </p>
            </div>
            <div>
                {
                    data.map((item) => {
                        return(
                            <div>
                                <p>{ item }</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='footer'>
                <div className=''>
                    <p>
                        I am a senior full stack developer witn nearly ten years of experience in software development.
                        My main skils include React and Vue on the frontend, and on the backend I favor Golang and Node.js
                    </p>
                    <p></p>
                </div>
                <div className=''></div>
                <div className=''></div>
            </div>
        </>
    )
}