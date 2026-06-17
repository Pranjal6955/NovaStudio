"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getContacts, deleteContact } from "@/services/api";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) loadContacts();
  }, [isAuthenticated]);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data.contacts || data || []);
    } catch { /* empty */ }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact submission?")) return;
    try {
      await deleteContact(id);
      loadContacts();
    } catch { /* empty */ }
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <div className="admin-topbar">
        <h1>Contacts</h1>
      </div>
      <div className="admin-content">
        <div className="admin-table-wrapper">
          <div className="admin-table-header">
            <h2>Contact Submissions</h2>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.message.slice(0, 60)}...</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{ padding: "6px 12px", borderRadius: 8, background: "#FEE2E2", color: "#DC2626", border: "none", cursor: "pointer", fontSize: 13 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: "center", color: "#9CA3AF", padding: 32 }}>No contact submissions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
