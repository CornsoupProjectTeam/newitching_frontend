import React, { useState, useEffect, useRef } from "react";

/* css */
import "./MatchingResultPage.css";

/* components */
import TeamSidebar from "../../components/TeamMatchingResult/TeamSidebar";
import TeamInfoCard from "../../components/TeamMatchingResult/TeamInfoCard";
import AverageMatchingResultCard from "../../components/TeamMatchingResult/AverageMatchingResultCard";
import SimilarityMatchingResultCard from "../../components/TeamMatchingResult/SimilarityMatchingResultCard";
import DiversityMatchingResultCard from "../../components/TeamMatchingResult/DiversityMatchingResultCard";

const MatchingResultPage = () => {
    const [projectName, setProjectName] = useState("");
    const [teamList, setTeamList] = useState([]);
    const [teamInfo, setTeamInfo] = useState({ teamName: "", teamId: "" });
    const [teamMembers, setTeamMembers] = useState([]);
    const [averageScores, setAverageScores] = useState([]);
    const [similarityScores, setSimilarityScores] = useState([]);
    const [diversityScores, setDiversityScores] = useState([]);
    const [date, setDate] = useState("");
    const socketRef = useRef(null);

    // WebSocket 연결 설정
    useEffect(() => {
        const matchingId = localStorage.getItem("matchingId");
        const token = localStorage.getItem("authToken");

        if (!matchingId || !token) {
            console.error("매칭 ID 또는 토큰이 없습니다. WebSocket을 연결할 수 없습니다.");
            return;
        }

        const wsUrl = `${process.env.REACT_APP_WS_URL}/matching/${matchingId}/team_matching_results?token=${token}`;
        console.log("WebSocket 연결 시도:", wsUrl);
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log("WebSocket connected for Matching Results");
        };

        socketRef.current.onmessage = (event) => {
            console.log("WebSocket raw message:", event.data);

            try {
                const data = JSON.parse(event.data);
                if (data && data.teams && data.teams.length > 0) {
                    console.log("Received team matching results:", data);

                    const firstTeam = data.teams[0];

                    // 프로젝트 이름과 날짜 설정
                    setProjectName(`프로젝트 ${data.matchingId}`);
                    setDate(new Date().toLocaleString());

                    // 팀 목록 설정
                    const teamNames = data.teams.map((team, index) => `Team ${index + 1}`);
                    setTeamList(teamNames);

                    // 첫 번째 팀 정보 설정
                    setTeamInfo({ teamName: `Team ${firstTeam.teamIndex + 1}`, teamId: firstTeam.teamIndex });

                    // 멤버 목록 설정 (DTO 구조 반영)
                    const members = firstTeam.members.map((member) => ({
                        name: member.name || "이름 없음",
                        affiliation: member.affiliation || "소속 없음",
                    }));
                    setTeamMembers(members);

                    // 평균 점수 설정 (DTO 구조 반영)
                    setAverageScores([
                        { label: "성실성", score: firstTeam.conscientiousnessMeanScore || 0, eval: firstTeam.conscientiousnessMeanEval || 0 },
                        { label: "친화성", score: firstTeam.agreeablenessMeanScore || 0, eval: firstTeam.agreeablenessMeanEval || 0 },
                    ]);

                    // 유사성 점수 설정 (DTO 구조 반영)
                    setSimilarityScores([
                        { label: "성실성", score: firstTeam.conscientiousnessSimilarityScore || 0, eval: firstTeam.conscientiousnessSimilarityEval || 0 },
                        { label: "친화성", score: firstTeam.agreeablenessSimilarityScore || 0, eval: firstTeam.agreeablenessSimilarityEval || 0 },
                        { label: "신경증", score: firstTeam.neuroticismSimilarityScore || 0, eval: firstTeam.neuroticismSimilarityEval || 0 },
                    ]);

                    // 다양성 점수 설정 (DTO 구조 반영)
                    setDiversityScores([
                        { label: "개방성", score: firstTeam.opennessDiversityScore || 0, eval: firstTeam.opennessDiversityEval || 0 },
                        { label: "외향성", score: firstTeam.extraversionDiversityScore || 0, eval: firstTeam.extraversionDiversityEval || 0 },
                    ]);
                }
            } catch (error) {
                console.error("Failed to parse message:", error);
            }
        };

        socketRef.current.onclose = (event) => {
            console.log("WebSocket disconnected", event);
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log("WebSocket connection closed.");
            }
        };
    }, []);

    return (
        <div className="matching-layout">
            <TeamSidebar
                projectName={projectName}
                date={date}
                maxUsers={teamMembers.length}
                teamSize={teamMembers.length / teamList.length || 1}
                teamList={teamList}
                currentTeam={teamInfo.teamName}
            />
            <main className="matching-content">
                <TeamInfoCard
                    teamName={teamInfo.teamName}
                    teamId={teamInfo.teamId}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                    totalTeams={teamList.length}
                    members={teamMembers}
                />
                <AverageMatchingResultCard
                    scores={averageScores}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                />
                <SimilarityMatchingResultCard
                    scores={similarityScores}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                />
                <DiversityMatchingResultCard
                    scores={diversityScores}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                />
            </main>
        </div>
    );
};

export default MatchingResultPage;

// import React, { useState, useEffect, useRef } from "react";
//
// /* css */
// import "./MatchingResultPage.css";
//
// /* components */
// import TeamSidebar from "../../components/TeamMatchingResult/TeamSidebar";
// import TeamInfoCard from "../../components/TeamMatchingResult/TeamInfoCard";
// import AverageMatchingResultCard from "../../components/TeamMatchingResult/AverageMatchingResultCard";
// import SimilarityMatchingResultCard from "../../components/TeamMatchingResult/SimilarityMatchingResultCard";
// import DiversityMatchingResultCard from "../../components/TeamMatchingResult/DiversityMatchingResultCard";
//
// const MatchingResultPage = () => {
//     const [projectName, setProjectName] = useState("");
//     const [teamList, setTeamList] = useState([]);
//     const [teamInfo, setTeamInfo] = useState({ teamName: "", teamId: "" });
//     const [teamMembers, setTeamMembers] = useState([]);
//     const [averageScores, setAverageScores] = useState([]);
//     const [similarityScores, setSimilarityScores] = useState([]);
//     const [diversityScores, setDiversityScores] = useState([]);
//     const [date, setDate] = useState("");
//     const socketRef = useRef(null);
//
//     // 더미 데이터 생성 함수
//     const generateDummyData = () => {
//         return {
//             matchingId: "12345",
//             teams: [
//                 {
//                     teamIndex: 0,
//                     members: [
//                         { name: "Alice", affiliation: "Engineering" },
//                         { name: "Bob", affiliation: "Marketing" },
//                         { name: "Charlie", affiliation: "Design" },
//                     ],
//                     conscientiousnessMeanScore: 72.5,
//                     conscientiousnessMeanEval: 4,
//                     agreeablenessMeanScore: 68.3,
//                     agreeablenessMeanEval: 3,
//                     conscientiousnessSimilarityScore: 80.0,
//                     conscientiousnessSimilarityEval: 5,
//                     agreeablenessSimilarityScore: 75.0,
//                     agreeablenessSimilarityEval: 4,
//                     neuroticismSimilarityScore: 65.0,
//                     neuroticismSimilarityEval: 3,
//                     opennessDiversityScore: 70.0,
//                     opennessDiversityEval: 4,
//                     extraversionDiversityScore: 60.0,
//                     extraversionDiversityEval: 3,
//                 },
//             ],
//         };
//     };
//
//     // WebSocket 연결 대신 더미 데이터를 사용하여 테스트
//     useEffect(() => {
//         console.log("더미 데이터로 MatchingResultPage 테스트");
//
//         const data = generateDummyData();
//         if (data && data.teams && data.teams.length > 0) {
//             const firstTeam = data.teams[0];
//
//             // 프로젝트 이름과 날짜 설정
//             setProjectName(`프로젝트 ${data.matchingId}`);
//             setDate(new Date().toLocaleString());
//
//             // 팀 목록 설정
//             const teamNames = data.teams.map((team, index) => `Team ${index + 1}`);
//             setTeamList(teamNames);
//
//             // 첫 번째 팀 정보 설정
//             setTeamInfo({ teamName: `Team ${firstTeam.teamIndex + 1}`, teamId: firstTeam.teamIndex });
//
//             // 멤버 목록 설정
//             const members = firstTeam.members.map((member) => ({
//                 name: member.name,
//                 affiliation: member.affiliation,
//             }));
//             setTeamMembers(members);
//
//             // 평균 점수 설정
//             setAverageScores([
//                 { label: "성실성", score: firstTeam.conscientiousnessMeanScore, eval: firstTeam.conscientiousnessMeanEval },
//                 { label: "친화성", score: firstTeam.agreeablenessMeanScore, eval: firstTeam.agreeablenessMeanEval },
//             ]);
//
//             // 유사성 점수 설정
//             setSimilarityScores([
//                 { label: "성실성", score: firstTeam.conscientiousnessSimilarityScore, eval: firstTeam.conscientiousnessSimilarityEval },
//                 { label: "친화성", score: firstTeam.agreeablenessSimilarityScore, eval: firstTeam.agreeablenessSimilarityEval },
//                 { label: "신경증", score: firstTeam.neuroticismSimilarityScore, eval: firstTeam.neuroticismSimilarityEval },
//             ]);
//
//             // 다양성 점수 설정
//             setDiversityScores([
//                 { label: "개방성", score: firstTeam.opennessDiversityScore, eval: firstTeam.opennessDiversityEval },
//                 { label: "외향성", score: firstTeam.extraversionDiversityScore, eval: firstTeam.extraversionDiversityEval },
//             ]);
//         }
//     }, []);
//
//     return (
//         <div className="matching-layout">
//             <TeamSidebar
//                 projectName={projectName}
//                 date={date}
//                 maxUsers={teamMembers.length}
//                 teamSize={teamMembers.length / teamList.length || 1}
//                 teamList={teamList}
//                 currentTeam={teamInfo.teamName}
//             />
//             <main className="matching-content">
//                 <TeamInfoCard
//                     teamName={teamInfo.teamName}
//                     teamId={teamInfo.teamId}
//                     teamIndex={teamList.indexOf(teamInfo.teamName)}
//                     totalTeams={teamList.length}
//                     members={teamMembers}
//                 />
//                 <AverageMatchingResultCard
//                     scores={averageScores}
//                     teamIndex={teamList.indexOf(teamInfo.teamName)}
//                 />
//                 <SimilarityMatchingResultCard
//                     scores={similarityScores}
//                     teamIndex={teamList.indexOf(teamInfo.teamName)}
//                 />
//                 <DiversityMatchingResultCard
//                     scores={diversityScores}
//                     teamIndex={teamList.indexOf(teamInfo.teamName)}
//                 />
//             </main>
//         </div>
//     );
// };
//
// export default MatchingResultPage;
