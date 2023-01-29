import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getRecentPapers } from "../../axios/paper.axios";

import Paper from "../../components/employee/Paper.component";

const RecentUpdates = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [recentPapers, setRecentPapers] = useState([]);

  useEffect(() => {
    getRecentPapers(user.token).then((response) => {
      setRecentPapers(response.data);
    });
  }, [user.token]);

  return (
    <div className="h-full">
      <h1 className="text-xl font-semibold text-center mr-3">Recent Updates</h1>
      <div className="overflow-y-scroll h-full">
        {recentPapers.map((paper, index) => {
          return (
            <div className="m-2">
              <Paper paper={paper} key={index} user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentUpdates;
