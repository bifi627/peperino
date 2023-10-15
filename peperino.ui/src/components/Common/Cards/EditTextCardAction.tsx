import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Close, Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface MyTextCardActionProps {
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    mainText: string;
    subTexts?: string[];
    onTextChanged?: (newText: string) => void;
}

const formValueSchema = z.object({
    state: z.object({
        illegal: z.string().optional(),
        editText: z.string()
            .min(3)
            .refine(value => !value.includes('?'), {
                message: 'editText must not contain the "?" character',
            }),
    }).refine(value => !(value.illegal && value.editText.includes(value.illegal)), { message: z.ZodIssueCode.custom, path: ["editText"] })
});

type FormValues = typeof formValueSchema._type;

export const EditTextCardAction = (props: MyTextCardActionProps) => {

    const [editMode, setEditMode] = useState(false);

    const { handleSubmit, register, formState, control, reset, } = useForm<FormValues>({
        values: {
            state: {
                editText: props.mainText,
            }
        },
        mode: "onChange",
        resolver: zodResolver(formValueSchema),

    });

    const onSubmit = (data: FormValues) => {
        props.onTextChanged?.(data.state.editText);
        setEditMode(false);
    }

    return (
        <Stack sx={{ opacity: props.disabled ? ".25" : "1" }} padding={1.5} width="100%">
            <Paper elevation={2}>
                {editMode === false &&
                    <Box padding={2} display={"flex"} justifyContent={"space-between"} alignItems="center" gap={2}>
                        {props.leftIcon && <IconButton>
                            {props.leftIcon}
                        </IconButton>}
                        <Box display={"flex"} flexDirection={"column"}>
                            <span>{props.mainText}</span>
                            {props.subTexts?.map(text => {
                                return <span key={text} style={{ fontSize: "12px" }}>{text}</span>
                            })}
                        </Box>
                        <Box>
                            <IconButton onClick={() => {
                                props.disabled !== true && setEditMode(true);
                            }}>
                                <Paper elevation={3} sx={{ borderRadius: 20, padding: 1, display: "flex" }}>
                                    <Edit />
                                </Paper>
                            </IconButton>
                        </Box>
                    </Box>
                }
                {editMode === true &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box padding={2} display={"flex"} justifyContent={"space-between"} alignItems="center" gap={2}>
                            {props.leftIcon && <IconButton>
                                {props.leftIcon}
                            </IconButton>}
                            <Box display={"flex"} flexDirection={"column"}>
                                <TextField autoFocus size="small" {...register("state.editText")} error={Boolean(formState.errors.state?.editText)} helperText={formState.errors.state?.editText?.message} />
                                {props.subTexts?.map(text => {
                                    return <span key={text} style={{ fontSize: "12px" }}>{text}</span>
                                })}
                            </Box>
                            <Box display={"flex"} flexDirection={"row"}>
                                {formState.dirtyFields.state?.editText && <IconButton type="submit" >
                                    <Paper elevation={3} sx={{ borderRadius: 20, padding: 1, display: "flex" }}>
                                        <Check />
                                    </Paper>
                                </IconButton>}
                                <IconButton onClick={() => {
                                    setEditMode(false);
                                    reset(formState.defaultValues);
                                }}>
                                    <Paper elevation={3} sx={{ borderRadius: 20, padding: 1, display: "flex" }}>
                                        <Close />
                                    </Paper>
                                </IconButton>
                            </Box>
                        </Box>
                    </form>
                }
            </Paper>
        </Stack>
    );
}
