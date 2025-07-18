import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { EditedPost, Post } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  editedPost: Post;
  onClose: () => void;
}

export default function EditPostForm({ editedPost, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Title must be at least 2 characters")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required"),
    body: Yup.string()
      .max(50, "Content must be at most 50 characters")
      .required("Content is required"),
  });

  const mutation = useMutation({
    mutationFn: (values: EditedPost) => editPost(editedPost?.id, values),
    onSuccess: () => {
      alert("Post edited successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  const handleSubmit = (values: EditedPost, formikHelpers: FormikHelpers<EditedPost>) => {
    mutation.mutate(values);
    formikHelpers.resetForm();
    onClose();
  };

  const initialValues: EditedPost = {
    title: editedPost.title || "",
    body: editedPost.body || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
