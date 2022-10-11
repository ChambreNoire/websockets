import React from 'react'
import { useEffect } from "react";

export const Subscriptions = ({ children }) => {

    useEffect(() => {
        const isSSE = false
        const location = window.location
        const source = isSSE
            ? new EventSource('resources/sse')
            : new WebSocket('ws://' + location.hostname + (location.port ? ':' + location.port : '') + '/ws')
        source.onopen = () => {
            console.debug(`${isSSE ? 'SSE' : 'WS'} - Connected!`)
        }
        source.onerror = (error) => {
            console.error(`${isSSE ? 'SSE' : 'WS'} - Error!`, error)
        }
        source.onmessage = (event) => {
            console.log(`${isSSE ? 'SSE' : 'WS'} - Received message`, event)
        }
        return () => {
            console.debug(`${isSSE ? 'SSE' : 'WS'} - Closing`)
            source.close()
        }
    }, [])

    return children
}