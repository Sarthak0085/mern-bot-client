import { Avatar, Box, Typography } from "@mui/material"
import { useAuth } from "../../context/AuthContext"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from "react";

function extractCodeFromMessage(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }

}

function isCodeBlock(str: string) {
    if (
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes(";") ||
        str.includes("`") ||
        str.includes("=") ||
        str.includes("//") ||
        str.includes("#")
    ) {
        return true;
    }

    return false;
}


const ChatItem = ({ role, content }: { content: string, role: "user" | "assistant" }) => {
    const isMessageBlock = extractCodeFromMessage(content);

    const [language, setLanguage] = useState("");
    console.log(language);


    useEffect(() => {
        if (isMessageBlock) {
            const codeLanguage = content.split('```')[1].split("\n")[0]
            setLanguage(codeLanguage);
        }

    }, [isMessageBlock])

    const auth = useAuth();
    console.log(auth);


    return role === "assistant" ? (
        <Box
            sx={{
                display: "flex",
                p: 2,
                my: 2,
                gap: 2,
                bgcolor: "#004d5685",
                borderRadius: 2,
            }}>
            <Avatar sx={{
                ml: 0,
                bgcolor: '#fff'
            }}>
                <img src="openai.png" alt="openai" width={"30px"} />
            </Avatar>
            <Box sx={{ overflowX: "auto" }}>
                {
                    !isMessageBlock &&
                    (
                        <Typography sx={{ fontSize: "20px", overflowX: "auto" }}>
                            {content}
                        </Typography>
                    )
                }
                {
                    isMessageBlock &&
                    isMessageBlock.length &&
                    isMessageBlock.map((block, index) => (
                        isCodeBlock(block)
                            ?
                            <SyntaxHighlighter key={index} style={dark} language={language}>
                                {block}
                            </SyntaxHighlighter>
                            :
                            <Typography key={index} sx={{ fontSize: "20px" }}>
                                {block}
                            </Typography>
                    ))
                }
            </Box>
        </Box>
    ) : (
        <Box sx={{
            display: "flex",
            bgcolor: "#004d76",
            borderRadius: 2,
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            my: 2,
            gap: 2,
        }}>
            <Box sx={{
                display: "flex",
                gap: 2,
            }}>
                <Avatar sx={{
                    ml: 0,
                    bgcolor: "black",
                    color: "white"
                }}>
                    {auth?.user?.name[0]}
                    {auth?.user?.name.split(" ")[1][0]}
                </Avatar>
                <Box>
                    <Typography sx={{ bgcolor: "004d76", fontSize: "20px" }}>
                        {content}
                    </Typography>
                </Box>
            </Box>
            {/* <IconButton
                  sx={{ color: "white", justifyItems: "self-end", right: 0 }}>
                 <AiTwotoneEdit />
             </IconButton> */}
        </Box>
    )
}

export default ChatItem