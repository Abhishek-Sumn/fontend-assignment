"use client";
import React, { useEffect, useState, useRef } from "react";
import { MimicLogs, MimicMetrics } from "../api-mimic";

const Logs = () => {
  const startTs = Date.now() - 24 * 60 * 60 * 1000; // Example: 24 hours ago
  const endTs = Date.now(); // Example: Current timestamp
  const limit = 60; // Example: Fetch up to 10 logs
  const [logs, setLogs] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    MimicLogs.fetchPreviousLogs({ startTs, endTs, limit })
      .then((logs) => {
        setLogs(logs);
        console.log("Previous Logs:", logs);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      });
  }, []);

  // Scroll to the bottom of the container when logs change
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className="bg-[#021120] border rounded-lg fixed h-[85vh] w-[90%] ml-[5%] overflow-y-auto mt-4"
      ref={scrollContainerRef}
    >
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <div key={index} className="flex gap-1 mr-3 p-2 text-sm">
            <hr className="h-5 w-0.5 bg-blue-500 ml-1 mr-1" />
            <h3 className="text-[#ffffffa7]">
              {new Date(log.timestamp).toString().slice(0, 24)}
            </h3>
            <h1 className="text-[#ffffffa7] ml-2 mr-1">[info]</h1>
            <span className="text-[#CEE0F8]">
              {log.message.substring(0, 160)}
            </span>
          </div>
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default Logs;
